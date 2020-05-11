import styled, { css } from 'styled-components';

export const StyledHome = styled.div`
    ${({ theme }) => css`
        color: ${theme.gray.primary};
        height: 100vh;

        > * {
            padding-left: 20px;
            padding-right: 20px;
        }
    `}
`;
