import styled, { css } from 'styled-components';
import { ISelectedComp } from '../circle-img/circle-img.interfaces';

export const StyledTagButton = styled.button<Partial<ISelectedComp>>`
    ${({ theme, selected }) => css`
        background-color: ${theme.gray.terciary};
        outline: none;
        cursor: pointer;
        border: thin solid transparent;
        border-radius: 2px;
        padding: 5px 10px;

        ${selected && css`
            border-color: ${theme.blue.primary};
        `}
    `}
`;
