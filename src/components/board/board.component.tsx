import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'semantic-ui-react';

import { StyledBoard } from './board.styles';
import { BoardCardComponent } from '../board-card';
import { CardComponent } from '../card';
import { StyledAddAction } from '../add-action';
import { AppContext } from '../../App.context';
import { IBoardComponent } from './board.interfaces';
import { ICardComponent } from '../card/card.interfaces';
import { StyledInvisibleInput } from '../invisible-input';
import { IShowTask } from '../card/card.interfaces';
import { ICard } from '../../models/models.interfaces';
import { instanceOfCardComponent } from '../../helpers/app.helpers';

export default ({ cards, id, name, position, setShow }: IBoardComponent & IShowTask) => {

    const { setBoards, boards, draggedElem, draggedPos, setDraggedPos, boardService, reloadBoards } = useContext(AppContext);
    const boardInputRef = useRef<HTMLInputElement>(null);
    const [boardRef, setBoardRef] = useState<HTMLDivElement | null>(null);
    const [showNewCard, setShowNewCard] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(name);

    const onDrop = async (e: any) => {

        if (!draggedElem || !instanceOfCardComponent(draggedElem)) {
            return;
        }

        const boardsCopy: IBoardComponent[] = [];
        let filteredCardsToUpdate: ICard[] = [];

        Object.assign(boardsCopy, boards);

        for (let i = 0; i < boardsCopy.length; i++) {

            let filteredCards = boardsCopy[i].cards.filter(({ id }) => id !== draggedElem.id);

            if (boardsCopy[i].id === id) {

                let leftSide = filteredCards.slice(0, draggedPos);
                const rightSide = filteredCards.slice(draggedPos);
                leftSide.push(draggedElem);
                filteredCards = leftSide.concat(rightSide);
                filteredCardsToUpdate = filteredCards;

            }

            boardsCopy[i].cards = filteredCards;

        }

        setBoards(boardsCopy);

        for (let i = 0; i < filteredCardsToUpdate.length; i++) {
            await boardService.updateCard({
                ...filteredCardsToUpdate[i],
                position: i,
                boardId: id,
            });
        }

        reloadBoards();

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
            .then(async () => {

                let lastPosition = -1;
                for (const board of boards) {

                    if (board.id !== id) {
                        lastPosition++;
                        await boardService.updateBoard({
                            ...board,
                            position: lastPosition,
                        })
                    }

                }
                reloadBoards();
            });

    }

    const changeName = (e: any) => {

        e.preventDefault();
        if (id) {
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
                });
        } else {
            boardService.createBoard({
                position,
                name: newName,
            })
                .then(() => {
                    setNewName('');
                    reloadBoards();
                });
        }

    }

    const onNewNameChange = (e: any) => {
        setNewName(e.target.value);
    }

    const onNewNameBlur = (e: any) => {
        
        if (!id && setShow) {
            setShow(false);
        }
        setNewName(name);

    }

    const getBoardRef = useCallback(
        (node) => {
            setBoardRef(node)
        },
        [setBoardRef]
    )

    useEffect(() => {
        if (!id && boardRef) {
            if (boardInputRef.current) {
                boardInputRef.current.focus();
            }
        }
    }, [boardRef])

    return (
        <StyledBoard ref={getBoardRef}>
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