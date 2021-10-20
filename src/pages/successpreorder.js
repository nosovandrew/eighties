import useSWR from 'swr';
import { request } from 'graphql-request';
import { useRouter } from 'next/router';

import { ORDER_BY_ID } from '@/apollo/client/queries';

export default function SuccessPreorder() {
    const {
        query: { id },
    } = useRouter();

    const fetcher = async (query) => await request(process.env.API_ENDPOINT, query, { OrderId: id });

    const { data, error } = useSWR(
        ORDER_BY_ID,
        fetcher
    )

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    console.log(data);

    return (
        <>
            <h1>Оформлен</h1>
            <p>Общая сумма: {data.orderById.total}</p>
        </>
    );
}
