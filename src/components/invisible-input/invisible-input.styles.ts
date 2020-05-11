import styled, { css } from 'styled-components';

export const StyledInvisibleInput = styled.input`
    ${({ theme }) => css`
        background-color: transparent;
        border: thin solid transparent;
        border-radius: 3px;
        padding: 5px;
        word-break: break-word;
        width: 100%;
        box-sizing: border-box;
        outline: none;

        :focus {
            background-color: ${theme.white.primary};
            border-color: ${theme.gray.secondary};
        }
    `}
`;
