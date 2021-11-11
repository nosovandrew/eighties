import styled from 'styled-components';

import { media } from '@/styles/media';

// just for h1 meaning at small text
export const H1 = styled.h1`
    margin: 0;
    font-size: 1em;
    font-weight: var(--basic-font-weight);
`;

// global h1 at page (big size and weight)
export const PageH1 = styled.h1`
    text-transform: uppercase;
    font-size: 1.3em;

    @media ${media.md} {
        font-size: 1.5em;
    }
`;

// max one string
export const TextItem = styled.p`
    margin: 0;
    text-align: center;

    @media ${media.md} {
        margin: 2px 0;
        text-align: left;
    }
`;

// block of text
export const TextBlock = styled.p`
    text-align: center;
    line-height: 1.5em;
    max-width: 80%;
    
    @media ${media.md} {
        max-width: 40%;
    }
`;