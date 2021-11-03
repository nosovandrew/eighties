import styled from 'styled-components';

// classic input form (without label)
export const InputForm = styled.input`
    width: 100%;
    padding: var(--basic-spacing);
    margin: var(--basic-spacing) 0;
    color: var(--text-primary);
    font-size: inherit;
    font-family: inherit;
    border: 2px solid var(--color-secondary);
    outline: none;

    &::placeholder {
        color: var(--text-gray);
    }

    &:invalid {
        // some styles
    }
`;