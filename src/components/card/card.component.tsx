import React from 'react';

import { BoardCardComponent } from '../board-card';
import { StyledCardComponent } from './card.styles';
import { ICardComponent } from './card.interfaces';

export default ({ index, ...data }: ICardComponent) => {

    return (
        <BoardCardComponent data={data} index={index}>
            <StyledCardComponent>
                {data.title}
            </StyledCardComponent>
        </BoardCardComponent>
    )

}
