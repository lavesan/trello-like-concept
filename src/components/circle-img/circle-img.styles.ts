import styled, { css } from 'styled-components';
import { ISelectedComp } from './circle-img.interfaces';

export const StyledCircleImg = styled.div<Partial<ISelectedComp>>`
    ${({ theme, selected }) => css`
        border-radius: 50%;
        width: 25px;
        height: 25px;
        overflow: hidden;
        border: thin solid transparent;

        img {
            width: inherit;
            height: inherit;
        }

        ${selected && css`
            color: ${theme.blue.primary};
            border-color: ${theme.blue.primary};
        `}
    `}
`;
