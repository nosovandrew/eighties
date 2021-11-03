import styled from 'styled-components';

// common button UI
export const StyledButton = styled.button`
    width: fit-content;
    margin: var(--basic-spacing) 0;
    padding: 8px 16px;
    border-style: solid;
    border-width: 2px 4px 4px 2px;
    border-color: var(--color-secondary);
    background-color: var(--color-primary);
    color: var(--text-primary);
    font-size: inherit;
    font-family: inherit;
    text-align: center;
    cursor: pointer;
    user-select: none;

    &:focus {
        outline: 0;
    }

    &:disabled {
        border-color: var(--color-gray);
        color: var(--text-gray);
    }
`;

// inc/dec/del buttons in cart (small size)
export const CartItemButton = styled(StyledButton)`
    margin-left: var(--basic-spacing);
    padding: 2px 8px;
    /* border: 2px solid var(--color-secondary); */
`;
