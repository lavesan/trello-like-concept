import styled, { css } from 'styled-components';

export const StyledBoard = styled.div`
    ${({ theme }) => css`
        border-radius: 5px;
        height: 100%;

        .title-container {
            background-color: ${theme.gray.secondary};
            padding: 15px 10px;

            .title-container--name-input {
                background: none;
                border: thin solid transparent;
                text-transform: uppercase;
            }
        }

        .cards-list {
            padding-inline-start: 0;
            background-color: ${theme.gray.terciary};
            list-style-type:none;
            margin: 0;
            padding: 20px 0;
            height: 80%;

            > * {
                padding-right: 10px;
                padding-left: 10px;
            }
        }
    `}
`;
