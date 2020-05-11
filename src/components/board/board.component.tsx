import React, { useContext } from 'react';

import { IBoard } from '../../views/home/home.interfaces';
import { StyledBoard } from './board.styles';
import { BoardCardComponent } from '../board-card';
import { CardComponent } from '../card';
import { StyledAddAction } from '../add-action';
import { AppContext } from '../../App.context';

export default ({ cards, id, name }: IBoard) => {

    const { setBoards, boards, draggedElem, draggedPos, setDraggedPos } = useContext(AppContext);

    const onDrop = (e: any) => {

        if (!draggedElem) {
            return;
        }

        const baordsCopy: IBoard[] = [];

        Object.assign(baordsCopy, boards);

        for (let i = 0; i < baordsCopy.length; i++) {

            let filteredCards = baordsCopy[i].cards.filter(({ id }) => id !== draggedElem.id);

            if (baordsCopy[i].id === id) {

                let leftSide = filteredCards.slice(0, draggedPos);
                const rightSide = filteredCards.slice(draggedPos);
                leftSide.push(draggedElem);
                filteredCards = leftSide.concat(rightSide);

            }

            baordsCopy[i].cards = filteredCards;

        }

        setBoards(baordsCopy);

        setDraggedPos(20);

    }
    
    const onDragOver = (e: any) => {
        e.preventDefault();
    }

    return (
        <StyledBoard>
            <header className="title-container">
                <input className="title-container--name-input" value={name} />
            </header>
            <ul className="cards-list" onDrop={onDrop} onDragOver={onDragOver}>
                {cards.map((card, index) => <CardComponent key={card.id} index={index} {...card} />)}
                <BoardCardComponent index={cards.length}>
                    <StyledAddAction>+ TASK</StyledAddAction>
                </BoardCardComponent>
            </ul>
        </StyledBoard>
    );

}