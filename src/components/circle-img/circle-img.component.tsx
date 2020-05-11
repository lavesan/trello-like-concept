import React from 'react';

import { ICircleImgComponent } from './circle-img.interfaces';
import { StyledCircleImg } from './circle-img.styles';

export default ({ imgUrl, ...props }: ICircleImgComponent) => {

    return (
        <StyledCircleImg {...props}>
            <img src={imgUrl} alt="Imagem do usuário" />
        </StyledCircleImg>
    )

}
