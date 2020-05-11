import React, { useContext, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'semantic-ui-react';

import { StyledBoard } from './board.styles';
import { BoardCardComponent } from '../board-card';
import { CardComponent } from '../card';
import { StyledAddAction } from '../add-action';
import { AppContext } from '../../App.context';
import { IBoardComponent } from './board.interfaces';
import { StyledInvisibleInput } from '../invisible-input';

export default ({ cards, id, name, position }: IBoardComponent) => {

    const { setBoards, boards, draggedElem, draggedPos, setDraggedPos, boardService, reloadBoards } = useContext(AppContext);
    const boardInputRef = useRef<HTMLInputElement>(null);
    const [showNewCard, setShowNewCard] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(name);

    const onDrop = async (e: any) => {

        if (!draggedElem) {
            return;
        }

        const boardsCopy: IBoardComponent[] = [];

        Object.assign(boardsCopy, boards);

        for (let i = 0; i < boardsCopy.length; i++) {

            let filteredCards = boardsCopy[i].cards.filter(({ id }) => id !== draggedElem.id);

            if (boardsCopy[i].id === id) {

                let leftSide = filteredCards.slice(0, draggedPos);
                const rightSide = filteredCards.slice(draggedPos);
                leftSide.push(draggedElem);
                filteredCards = leftSide.concat(rightSide);

            }

            boardsCopy[i].cards = filteredCards;

        }

        setBoards(boardsCopy);
        
        boardService.updateCard({
            ...draggedElem,
            position: draggedPos,
            boardId: id,
        })
            .then(() => {
                reloadBoards();
            })


        setDraggedPos(0);

    }
    
    const onDragOver = (e: any) => {
        e.preventDefault();
    }

    const createNewTask = () => {
        setShowNewCard(true);
    }

    const renameBoard = () => {
        if (boardInputRef.current) {
            boardInputRef.current.focus();
        }
    }

    const removeBoard = async () => {

        for (const card of cards) {
            await boardService.deleteCard(card.id);
        }
        boardService.deleteBoard(id)
            .then(() => {
                reloadBoards();
            });

    }

    const changeName = (e: any) => {

        e.preventDefault();
        boardService.updateBoard({
            id,
            position,
            name: newName,
        })
            .then(() => {
                if (boardInputRef.current) {
                    boardInputRef.current.blur();
                }
                reloadBoards();
            })

    }

    const onNewNameChange = (e: any) => {
        setNewName(e.target.value);
    }

    const onNewNameBlur = (e: any) => {
        setNewName(name);
    }

    return (
        <StyledBoard>
            <header>
                <form className="title-container" onSubmit={changeName}>
                    <StyledInvisibleInput
                        ref={boardInputRef}
                        value={newName}
                        onChange={onNewNameChange}
                        onBlur={onNewNameBlur}
                        className="title-container--name-input" />
                    <Dropdown icon={<FontAwesomeIcon icon={faEllipsisV} />}>
                        <Dropdown.Menu>
                            <Dropdown.Item text='Renomear' onClick={renameBoard} />
                            <Dropdown.Item text='Excluir' onClick={removeBoard} />
                        </Dropdown.Menu>
                    </Dropdown>
                </form>
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