import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from 'graphql-request';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';

import { media } from '@/styles/media';
import { PageH1, TextItem } from '@/components/atoms/text';
import { ErrorMark } from '@/components/atoms/svgs';
import { InputForm } from '@/components/atoms/forms';
import StyledButton from '@/components/atoms/buttons';
import Layout from '@/components/templates/layout';

import { CartContext } from '@/contexts/cart/context';
import { actions, generateCompleteState } from '@/contexts/cart/actions';
import { CREATE_ORDER } from '@/apollo/client/mutations';
import { PRODUCTS_BY_LIST_OF_IDS } from '@/apollo/client/queries';
import { useForm } from '@/hooks/useForm';

const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${media.md} {
        width: auto;
        height: var(--full-screen-h);
        margin: 0;
    }
`;

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media ${media.md} {
        width: 30%;
    }
`;

const ValidationErrorContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: var(--basic-spacing);

    & > svg {
        margin-right: var(--basic-spacing);
    }
`;

export default function Preorder() {
    const router = useRouter(); // for redirecting to success page
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state; // get cart from state
    const [loading, setLoading] = useState(false); // createOrder button loading indicator
    // define form with custom hook
    const {
        handleSubmit,
        handleChange,
        data: { firstName, lastName, address, postalCode, phoneNumber },
        errors,
    } = useForm({
        validations: {
            // all validation rules (for some keys)
            phoneNumber: {
                pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Некорректный номер телефона',
                },
            },
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
                // image: item.image isn't necessary in db (removed)
            });
        });

        // generate local (not in context) cart with checked items for throwing to db as order part
        // using actions helper generateCompleteState WITHOUT dispatch!
        return generateCompleteState('not_action', checkedItems, cart);
    };
    // handle click on order btn
    const placeOrderHandler = async () => {
        setLoading(true);
        try {
            const { payload: checkedCart } = await checkCart(); // check cart for malicious changes, then get new updated cart obg
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
                    items: checkedCart.items,
                    total: checkedCart.total,
                    currency: checkedCart.currency,
                },
            };
            // send order to Telegram CRM Bot
            await fetch(process.env.CRM_BOT, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(variables.input),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // create order in DB
            const data = await request(
                process.env.API_ENDPOINT,
                CREATE_ORDER,
                variables
            );
            dispatch({ type: actions.CLEAR_CART }); // refresh cart
            router.push(`/successorder?id=${data.createOrder.recordId}`); // redirect to success page
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err);
        }
    };

    return (
        <Layout>
            <NextSeo
                title='Информация для доставки'
                description='Страница, на которой клиент оставляет свои данные, необходимые для доставки, а также подтверждает создаваемый им заказ.'
            />
            <OrderContainer>
                <PageH1>Кому и Куда</PageH1>
                <StyledForm onSubmit={handleSubmit}>
                    <InputForm
                        placeholder='Имя'
                        value={firstName || ''}
                        onChange={handleChange('firstName')}
                        required
                    />
                    {errors.firstName && (
                        <ValidationErrorContainer>
                            <ErrorMark />
                            <TextItem>{errors.firstName}</TextItem>
                        </ValidationErrorContainer>
                    )}
                    <InputForm
                        placeholder='Фамилия'
                        value={lastName || ''}
                        onChange={handleChange('lastName')}
                        required
                    />
                    {errors.lastName && (
                        <ValidationErrorContainer>
                            <ErrorMark />
                            <TextItem>{errors.lastName}</TextItem>
                        </ValidationErrorContainer>
                    )}
                    <InputForm
                        placeholder='Адрес (город, улица, дом)'
                        value={address || ''}
                        onChange={handleChange('address')}
                        required
                    />
                    {errors.address && (
                        <ValidationErrorContainer>
                            <ErrorMark />
                            <TextItem>{errors.address}</TextItem>
                        </ValidationErrorContainer>
                    )}
                    <InputForm
                        placeholder='Почтовый индекс'
                        value={postalCode || ''}
                        onChange={handleChange('postalCode')}
                        required
                    />
                    {errors.postalCode && (
                        <ValidationErrorContainer>
                            <ErrorMark />
                            <TextItem>{errors.postalCode}</TextItem>
                        </ValidationErrorContainer>
                    )}
                    <InputForm
                        placeholder='Номер телефона'
                        type='tel'
                        value={phoneNumber || ''}
                        onChange={handleChange('phoneNumber')}
                        required
                    />
                    {errors.phoneNumber && (
                        <ValidationErrorContainer>
                            <ErrorMark />
                            <TextItem>{errors.phoneNumber}</TextItem>
                        </ValidationErrorContainer>
                    )}
                    <StyledButton type='submit' loading={loading}>
                        Заказать
                    </StyledButton>
                </StyledForm>
            </OrderContainer>
        </Layout>
    );
}
