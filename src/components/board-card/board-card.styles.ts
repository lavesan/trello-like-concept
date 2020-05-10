import styled, { css } from 'styled-components';

import { IStyledBoard } from './board-card.interfaces';

export const StyledBoardCard = styled.li<IStyledBoard>`
    ${({ expandWidth }) => css`
        background-color: "red",
        opacity: 1,
        transition: "margin-bottom .3s",
        padding-bottom: ${expandWidth + 10}px;
    `}
`;
