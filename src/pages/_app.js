import GlobalStyle from '@/styles/global';
import { DefaultSeo } from 'next-seo';

import { SEO } from '../../seo.config';

import { CartContextProvider } from '@/contexts/cart/context';

export default function App({ Component, pageProps }) {
    return (
        <>
            {/* add global styles */}
            <GlobalStyle />
            <DefaultSeo {...SEO} />
            <CartContextProvider>
                <Component {...pageProps} />
            </CartContextProvider>
        </>
    );
}
