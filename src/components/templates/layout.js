import Nav from '@/components/organisms/nav';

export default function Layout({ children }) {
    return (
        <>
            <Nav />
            <main>{children}</main>
        </>
    );
}