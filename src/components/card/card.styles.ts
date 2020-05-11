import styled, { css } from 'styled-components';

export const StyledCardComponent = styled.div`
    ${({ theme }) => css`
        background-color: ${theme.white.primary};
        padding: 10px;
        border-radius: 5px;
        box-shadow: 1px 2px 2.9px 0px #e3e3e3;
        cursor: grab;

        .title-text {
            margin: 0;
        }

        .card-aditionals {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;

            .card-aditionals--tags {
                display: flex;
                align-items: center;

                > :not(:last-child) {
                    margin-right: 5px;
                }
            }
        }
    `}
`
