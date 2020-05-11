import React, { useContext, useState } from 'react';

import { StyledBoard } from './board.styles';
import { BoardCardComponent } from '../board-card';
import { CardComponent } from '../card';
import { StyledAddAction } from '../add-action';
import { AppContext } from '../../App.context';
import { IBoardComponent, INewTask } from './board.interfaces';

export default ({ cards, id, name }: IBoardComponent) => {

    const { setBoards, boards, draggedElem, draggedPos, setDraggedPos } = useContext(AppContext);
    const [showNewCard, setShowNewCard] = useState<boolean>(false);

    const onDrop = (e: any) => {

        if (!draggedElem) {
            return;
        }

        const baordsCopy: IBoardComponent[] = [];

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

    const createNewTask = () => {
        setShowNewCard(true);
    }

    return (
        <StyledBoard>
            <header className="title-container">
                <input className="title-container--name-input" value={name} />
            </header>
            <ul className="cards-list" onDrop={onDrop} onDragOver={onDragOver}>
                {cards.map((card, index) => <CardComponent key={card.id} {...card} index={index} />)}
                {showNewCard &&
                    <CardComponent
                        boardId={id}
                        userIds={[]}
                        tagsIds={[]}
                        tags={[]}
                        users={[]}
                        id={0}
                        title={''}
                        position={cards.length}
                        index={cards.length}
                        setShow={setShowNewCard} />
                }
                <BoardCardComponent index={cards.length}>
                    <StyledAddAction onClick={createNewTask}>+ TASK</StyledAddAction>
                </BoardCardComponent>
            </ul>
        </StyledBoard>
    );

}