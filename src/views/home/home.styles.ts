import styled, { css } from 'styled-components';

export const StyledHome = styled.div`
    ${({ theme }) => css`
        color: ${theme.gray.primary};
        height: 100vh;

        > * {
            padding-left: 20px;
            padding-right: 20px;
        }

        .filter-input-container {
            display: flex;
            flex-flow: row nowrap;
            width: 60%;

            > :first-child {
                margin-right: 10px;
            }
        }

        .boards-section {
            overflow-x: scroll;
            display: flex;
            flex-flow: row nowrap;
            padding-top: 20px;
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
