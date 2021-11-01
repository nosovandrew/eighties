import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        /* Colors */
        --color-primary: #ffffff;
        --text-primary: #000;
        /* Spacing */
        --basic-spacing: 8px;
        --content-spacing: 64px;
        --full-screen-h: calc(100vh - 2*var(--basic-spacing)); // minus global padding (top+bottom)
        /* Font */
        --font-sans: 'Rubik', 'Roboto', -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue',
        'Helvetica', sans-serif;
        --font-weight: 500;
        --font-size: 18px;


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
        font-size: var(---font-size);
        font-weight: var(---font-weight);
    }

    a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* подсветка при касании (мобильные платформы) */
    }
`;

export default GlobalStyle;
