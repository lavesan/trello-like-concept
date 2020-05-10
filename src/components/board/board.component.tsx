import React from 'react';

import { IBoard } from '../../views/home/home.interfaces';
import { StyledBoard } from './board.styles';
import { BoardCardComponent } from '../board-card';

export default ({ cards, id, name }: IBoard) => {

    const onDrop = (e: any) => {
        console.log("elemento: ", e.dataTransfer.getData("card_id"));
      };
    
    const onDragOver = (e: any) => {
        e.preventDefault();
    };

    return (
        <StyledBoard>
            <ul onDrop={onDrop} onDragOver={onDragOver}>
                {cards.map((card, index) => <BoardCardComponent key={card.id} index={index} {...card} />)}
            </ul>
        </StyledBoard>
    );

}