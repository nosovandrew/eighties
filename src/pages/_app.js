import GlobalStyle from '@/styles/global';

import { CartContextProvider } from '@/contexts/cart/context';

export default function App({ Component, pageProps }) {
    return (
        <>
            {/* add global styles */}
            <GlobalStyle />
            <CartContextProvider>
                <Component {...pageProps} />
            </CartContextProvider>
        </>
    );
}
