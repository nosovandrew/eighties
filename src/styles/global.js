import { createGlobalStyle } from 'styled-components';

import { media } from './media';

const GlobalStyle = createGlobalStyle`
    :root {
        /* Color variables (static) */
        --base-black: hsla(0, 0%, 0%, 100%); // unused
        --base-white: hsla(0, 0%, 100%, 100%); // unused
        --base-gray: hsla(0, 0%, 41%, 100%); // unused
        /* Theme colors */
        --color-primary: #fff;
        --color-secondary: #000;
        --color-gray: #686868;
        /* Text color */
        --text-primary: #000;
        --text-secondary: #fff;
        --text-gray: #686868;
        /* Spacing */
        --basic-spacing: 8px;
        --content-spacing: 64px;
        --full-screen-h: calc(100vh - 2*var(--basic-spacing)); // minus global padding (top+bottom)
        /* Font */
        --font-sans: 'Rubik', 'Roboto', -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue',
        'Helvetica', sans-serif;
        --basic-font-weight: 500; // 500 for Rubik
        --basic-font-size: 16px; // 16 for Rubik
    }

    @media ${media.md} {
        :root {
            --basic-font-size: 18px;
        }
    }

    [data-theme='dark'] {
        // dark theme style vars
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    html {
        height: 100%;
        box-sizing: border-box;
        touch-action: manipulation;
        /* font-feature-settings: 'case' 1, 'rlig' 1, 'calt' 0; */
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html,
    body {
        font-family: var(--font-sans);
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--color-primary);
        color: var(--text-primary);
        overscroll-behavior-x: none;
    }

    body {
        position: relative;
        min-height: 100%;
        margin: 0;
        font-size: var(--basic-font-size);
        font-weight: var(--basic-font-weight);
    }

    a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* подсветка при касании (мобильные платформы) */
    }
`;

export default GlobalStyle;
