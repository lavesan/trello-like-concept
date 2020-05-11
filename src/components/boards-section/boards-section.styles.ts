import styled, { css } from 'styled-components';

export const StyledBoardsSection = styled.section`
    ${({ theme }) => css`
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
    `}
`;
