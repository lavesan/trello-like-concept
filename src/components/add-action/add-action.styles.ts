import styled, { css } from 'styled-components';

export const StyledAddAction = styled.button`
    ${({ theme }) => css`
        border: thin dotted ${theme.gray.primary};
        padding: 15px 10px;
        background: none;
        border-radius: 5px;
        color: ${theme.gray.primary};
        cursor: pointer;
        width: 100%;
        text-align: start;
        outline: none;
        white-space: nowrap;
    `}
`;
