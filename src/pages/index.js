import Layout from '@/components/templates/layout';
import Link from 'next/link';

const Home = () => {
    return (
        <Layout>
            <h1>80</h1>
            <Link href='/drops/1'>Drop 1</Link>
        </Layout>
    );
};

export default Home;
