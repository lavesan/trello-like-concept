import styled, { css } from 'styled-components';

export const StyledSearchInput = styled.input`
    ${({ theme }) => css`
        padding: 5px 10px;
        border: thin solid ${theme.gray.secondary};
        border-radius: 5px;
        width: 100%;
    `}
`
