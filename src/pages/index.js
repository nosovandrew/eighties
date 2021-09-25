import { request, gql } from 'graphql-request';

const Home = () => {
    const query = gql`
        {
            getProducts {
                title
            }
        }
    `;
    
    request('http://localhost:3000/api/graphql', query).then((data) =>
        console.log(data)
    );

    return (
        <>
            <h1>80</h1>
        </>
    )
};

export default Home;
