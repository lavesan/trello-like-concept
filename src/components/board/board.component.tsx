import React from 'react';

import { IBoard } from '../../views/home/home.interfaces';
import { StyledBoard } from './board.styles';
import { BoardCardComponent } from '../board-card';
import { StyledAddAction } from '../add-action';

export default ({ cards, id, name }: IBoard) => {

    const onDrop = (e: any) => {
        console.log("elemento: ", e.dataTransfer.getData("card_id"));
      };
    
    const onDragOver = (e: any) => {
        e.preventDefault();
    };

    return (
        <StyledBoard>
            <header className="title-container">
                <input className="title-container--name-input" value={name} />
            </header>
            <ul className="cards-list" onDrop={onDrop} onDragOver={onDragOver}>
                {cards.map((card, index) => <BoardCardComponent key={card.id} index={index} {...card} />)}
                <li className="cards-list--action-li">
                    <StyledAddAction>+ TASK</StyledAddAction>
                </li>
            </ul>
        </StyledBoard>
    );

}