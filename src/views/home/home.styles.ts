import styled, { css } from 'styled-components';

export const StyledHome = styled.div`
    ${({ theme }) => css`
        color: ${theme.gray.primary};
        height: 100vh;

        > * {
            padding-left: 20px;
            padding-right: 20px;
        }

        .boards-section {
            overflow-x: scroll;
            display: flex;
            flex-flow: row nowrap;
            padding-bottom: 20px;
            height: 100%;

            > :not(:last-child) {
                margin-right: 10px;
            }

            > * {
                width: 300px;
                min-width: 300px;
            }
        }
    `}
`;
