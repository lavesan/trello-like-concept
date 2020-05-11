import styled, { css } from 'styled-components';

import { IStyledSlideDown } from './slide-down.interfaces';

export const StyledSlideDown = styled.div`
    ${({ show, elemHeight }: IStyledSlideDown) => css`
        overflow: hidden;
        transition: height .3s;
        height: ${show ? elemHeight  : 0}px;
        box-sizing: border-box;
    `}
`
