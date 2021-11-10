import styled from 'styled-components';
import PropTypes from 'prop-types';

import { LoadingDots } from '@/components/atoms/loading';

// button component (can be modified by other styled-components)
const StyledButton = ({
    className = 'default', // className have to be 'default' (for this style-variants implementation)
    children,
    disabled = false,
    loading = false,
    // successed = false,
    // failed = false,
    ...rest
}) => {
    return (
        // default styles component (using only for default button, not to use for other components)
        <Default className={className} disabled={disabled} {...rest}>
            {loading ? <LoadingDots /> : children}
        </Default>
    );
};

StyledButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
};

// common (default) button UI
const Default = styled.button`
    /* width: fit-content; */
    min-width: 160px;
    min-height: 42px;
    margin: var(--basic-spacing) 0;
    padding: 8px 16px;
    /* border-style: solid;
    border-width: 2px 4px 4px 2px;
    border-color: var(--color-secondary); */
    border: 2px solid var(--color-secondary);
    box-shadow: 2px 2px 0 0 var(--color-secondary);
    background-color: var(--color-primary);
    color: var(--text-primary);
    font-size: inherit;
    font-family: inherit;
    text-align: center;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:focus {
        outline: 0;
    }

    &:disabled {
        box-shadow: 2px 2px 0 0 var(--color-gray);
        border-color: var(--color-gray);
        color: var(--text-gray);
    }
`;

// inc/dec/del buttons in cart (small size)
export const CartItemButton = styled(StyledButton)`
    && {
        min-width: fit-content;
        min-height: fit-content;
        margin-left: var(--basic-spacing);
        padding: 2px 8px;
        /* border: 2px solid var(--color-secondary); */
    }
`;

// export default btn
export default StyledButton;
