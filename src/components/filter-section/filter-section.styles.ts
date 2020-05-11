import styled, { css } from 'styled-components';

export const StyledFilterSection = styled.section`
    ${({ theme }) => css`
        .filter-input-container {
            display: flex;
            flex-flow: row nowrap;
            width: 60%;
            margin-bottom: 10px;

            > :first-child {
                margin-right: 10px;
            }

            .filter-input-container--advanced-button {
                background-color: ${theme.gray.terciary};
                border-radius: 2px;
                border: none;
                white-space: nowrap;
                padding: 10px 15px;
                cursor: pointer;
                outline: none;

                .filter-input-container--advanced-button--icon {
                    margin-left: 8px;
                }
            }
        }

        .advanced-filters-container {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin-bottom: 10px;

            .advanced-filters-container--users {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;

                .advanced-filters-container--users--user-tag {
                    cursor: pointer;
                    outline: none;
                    background: none;
                    border: none;
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;

                    .advanced-filters-container--users--image {
                        margin-right: 10px;
                    }

                    .advanced-filters-container--users--name {
                        margin: 0;

                        &.selected-text {
                            color: ${theme.blue.primary};
                        }
                    }
                }

                > * {
                    margin-right: 10px;
                }
            }

            .advanced-filters-container--divisor {
                width: 2px;
                height: 20px;
                background-color: ${theme.gray.terciary};
                margin-right: 10px;
            }

            .advanced-filters-container--tags-container {
                display: flex;
                flex-flow: row nowrap;

                > :not(:last-child) {
                    margin-right: 10px;
                }
            }
        }
    `}
`;
