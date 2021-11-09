import styled from 'styled-components';

// loading dots
export const LoadingDots = styled.span`
    &::after {
        display: inline-block;
        animation: dot-appearance 1s infinite;
        content: '.';
        font-size: inherit;
        font-family: inherit;
        text-align: left;
    }
    @keyframes dot-appearance {
        0% {
            content: '.';
        }
        33% {
            content: '..';
        }
        66% {
            content: '...';
        }
    }
`;
