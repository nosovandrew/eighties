import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { request } from 'graphql-request';

import { CartContext } from '@/contexts/cart/context';
import { CREATE_ORDER } from '@/apollo/client/mutations';
import { useForm } from '@/hooks/useForm';

export default function Preorder() {
    const router = useRouter(); // for redirecting to success page
    const { state, dispatch } = useContext(CartContext);
    const { items, total, currency } = state.cart; // get items array and total from cart
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
    // handle click on order btn
    const placeOrderHandler = async () => {
        try {
            const data = await request(
                process.env.API_ENDPOINT,
                CREATE_ORDER,
                variables
            );
            router.push('/successpreorder'); // redirect to succes page
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
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
                <button type='submit'>
                    Заказать
                </button>
            </form>
        </>
    );
}
