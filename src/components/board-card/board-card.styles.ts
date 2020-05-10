import styled, { css } from 'styled-components';

import { IStyledBoard } from './board-card.interfaces';

export const StyledBoardCard = styled.li<IStyledBoard>`
    ${({ expandHeight }) => css`
        ${({ deactivateTransition, transitionTime }: IStyledBoard) => !deactivateTransition && css`
            transition: padding ${transitionTime / 1000}s;
        `}
        padding-bottom: 10px;
        padding-top: ${expandHeight + 5}px;
    `}
`;
