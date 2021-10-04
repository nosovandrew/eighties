import GlobalStyle from '@/styles/global';

export default function App({ Component, pageProps }) {
    return (
        <>
            {/* add global styles */}
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
