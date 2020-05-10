import styled, { css } from 'styled-components';

export const StyledHome = styled.div`
    ${({ theme }) => css`
        color: ${theme.gray.primary};

        .boards-section {
            overflow-x: scroll;
            display: flex;
            flex-flow: row nowrap;
            padding: 20px 20px 10px;

            > :not(:last-child) {
                margin-right: 10px;
            }
        }
    `}
`;
