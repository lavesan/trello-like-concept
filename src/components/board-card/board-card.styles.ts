import styled, { css } from 'styled-components';

import { IStyledBoard } from './board-card.interfaces';

export const StyledBoardCard = styled.li<IStyledBoard>`
    ${({ theme, expandWidth }) => css`
        transition: padding .3s;
        padding-bottom: ${expandWidth + 10}px;

        .card-container {
            background-color: ${theme.white.primary};
            padding: 10px;
            border-radius: 5px;
            box-shadow: 1px 2px 2.9px 0px #e3e3e3;
            cursor: grab;
        }
    `}
`;
