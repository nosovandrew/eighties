import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { request } from 'graphql-request';

import Layout from '@/components/templates/layout';
import { CartContext } from '@/contexts/cart/context';
import { actions, generateCompleteState } from '@/contexts/cart/actions';
import { CREATE_ORDER } from '@/apollo/client/mutations';
import { PRODUCTS_BY_LIST_OF_IDS } from '@/apollo/client/queries';
import { useForm } from '@/hooks/useForm';

export default function Preorder() {
    const router = useRouter(); // for redirecting to success page
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state; // get cart from state
    const { items, total, currency } = cart; // get `items array`, `total` and `currency` from cart
    // define form with custom hook
    const {
        handleSubmit,
        handleChange,
        data: { firstName, lastName, address, postalCode, phoneNumber },
        errors,
    } = useForm({
        validations: {
            // all validation rules (for some keys)
        },
        onSubmit: () => placeOrderHandler(), // logic for submit func
        initialValues: {
            // start values (+ init states in hook)
            firstName: '',
            lastName: '',
            address: '',
            postalCode: '',
            phoneNumber: '',
        },
    });
    // check cart for unwanted changes (`hacks`)
    const checkCart = async () => {
        const checkedItems = []; // init array for checked cart items
        const listOfIds = []; // init array for ids
        // get ids of cart items and push in array
        cart.items.forEach((item) => {
            listOfIds.push(item._id);
        });
        // get products with our ids from DB
        const data = await request(
            process.env.API_ENDPOINT,
            PRODUCTS_BY_LIST_OF_IDS,
            { ids: listOfIds }
        );
        const productsFromDB = data.productsByListOfIds;
        // for each cart item find product from DB and compare fields
        cart.items.forEach((item) => {
            let productFromDB = productsFromDB.find(
                (product) => product._id === item._id
            ); // get product from DB for current cart item
            // add checked item to new array (checkedItems)
            // <<< we can make all checks there >>>
            checkedItems.push({
                _id: item._id,
                item: item.item,
                price: productFromDB.price.base, // unmodified price from DB
                sku: item.sku,
                qtyForSale: item.qtyForSale,
            });
        });
        await dispatch(
            generateCompleteState(actions.ADD_ITEM, checkedItems, cart)
        ); // update cart with checked items
    };
    // handle click on order btn
    const placeOrderHandler = async () => {
        try {
            await checkCart(); // check cart for malicious changes
            // input for CREATE_ORDER gql mutation
            const variables = {
                input: {
                    shipping: {
                        firstName,
                        lastName,
                        address,
                        postalCode,
                    },
                    phoneNumber,
                    items,
                    total,
                    currency,
                },
            };
            // create order in DB
            const data = await request(
                process.env.API_ENDPOINT,
                CREATE_ORDER,
                variables
            );
            dispatch({ type: actions.CLEAR_CART }); // refresh cart
            router.push(`/successpreorder?id=${data.createOrder.recordId}`); // redirect to success page
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h1>Предзаказ</h1>
            <form onSubmit={handleSubmit}>
                <h2>Доставка</h2>
                <input
                    placeholder='Имя'
                    value={firstName || ''}
                    onChange={handleChange('firstName')}
                    required
                />
                {errors.firstName && <p>{errors.firstName}</p>}
                <input
                    placeholder='Фамилия'
                    value={lastName || ''}
                    onChange={handleChange('lastName')}
                    required
                />
                {errors.lastName && <p>{errors.lastName}</p>}
                <input
                    placeholder='Адрес'
                    value={address || ''}
                    onChange={handleChange('address')}
                    required
                />
                {errors.address && <p>{errors.address}</p>}
                <input
                    placeholder='Индекс'
                    value={postalCode || ''}
                    onChange={handleChange('postalCode')}
                    required
                />
                {errors.postalCode && <p>{errors.postalCode}</p>}
                <input
                    placeholder='Номер телефона'
                    type='tel'
                    value={phoneNumber || ''}
                    onChange={handleChange('phoneNumber')}
                    required
                />
                {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
                <button type='submit'>Заказать</button>
            </form>
        </Layout>
    );
}
