import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        /* Colors */
        --color-primary: #ffffff;
        --text-primary: #000;
        /* Font */
        --font-sans: 'Roboto', -apple-system, system-ui, BlinkMacSystemFont, 'Helvetica Neue',
        'Helvetica', sans-serif;


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
    }

    a {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* подсветка при касании (мобильные платформы) */
    }
`;

export default GlobalStyle;
