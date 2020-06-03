import React, { useContext, useState, useRef, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'semantic-ui-react';

import { StyledBoard } from './board.styles';
import { BoardCardComponent } from '../board-card';
import { CardComponent } from '../card';
import { StyledAddAction } from '../add-action';
import { AppContext } from '../../App.context';
import { StyledInvisibleInput } from '../invisible-input';
import { IShowTask } from '../card/card.interfaces';
import { IColumn, IRow } from '../../models/models.interfaces';

export default ({ columns, _id, name, setShow }: IRow & IShowTask) => {

    const { setBoard, board, draggedElem, draggedPos, setDraggedPos, boardService, reloadBoards } = useContext(AppContext);
    const boardInputRef = useRef<HTMLInputElement>(null);
    const [boardRef, setBoardRef] = useState<HTMLDivElement | null>(null);
    const [showNewCard, setShowNewCard] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(name);

    const onDrop = async (e: any) => {

        if (!draggedElem) {
            return;
        }

        const boardsCopy: IRow[] = [];
        let filteredCardsToUpdate: IColumn[] = [];

        Object.assign(boardsCopy, board.rows);

        for (let i = 0; i < boardsCopy.length; i++) {

            let filteredCards = boardsCopy[i].columns.filter(({ _id }) => _id !== draggedElem._id);

            if (boardsCopy[i]._id === _id) {

                let leftSide = filteredCards.slice(0, draggedPos);
                const rightSide = filteredCards.slice(draggedPos);
                leftSide.push(draggedElem);
                filteredCards = leftSide.concat(rightSide);
                filteredCardsToUpdate = filteredCards;

            }

            boardsCopy[i].columns = filteredCards;

        }

        setBoard({
            ...board,
            rows: boardsCopy,
        });

        // TODO: Enviar uma requisição para o backend fazer isto, não o front.
        // for (let i = 0; i < filteredCardsToUpdate.length; i++) {
        //     await boardService.updateCard({
        //         ...filteredCardsToUpdate[i],
        //         boardId: _id,
        //     });
        // }

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

        // TODO: Alterar isto para meu backend remover esta Coluna desta Linha e atualizar tudo
        // for (const card of cards) {
        //     await boardService.deleteCard(card._id);
        // }
        // boardService.deleteRow(_id)
        //     .then(async () => {

        //         let lastPosition = -1;
        //         for (const board of rows) {

        //             if (board.id !== _id) {
        //                 lastPosition++;
        //                 await boardService.updateBoard({
        //                     ...board,
        //                     position: lastPosition,
        //                 })
        //             }

        //         }
        //         reloadBoards();
        //     });

    }

    const changeName = (e: any) => {

        e.preventDefault();
        if (_id) {
            boardService.updateBoard({
                _id,
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
        
        if (!_id && setShow) {
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
        if (!_id && boardRef) {
            if (boardInputRef.current) {
                boardInputRef.current.focus();
            }
        }
    }, [boardRef, _id])

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
                {columns.map((card, index) => <CardComponent key={card._id} {...card} boardId={_id} index={index} />)}
                {showNewCard &&
                    <CardComponent
                        boardId={_id}
                        tags={[]}
                        users={[]}
                        _id={''}
                        description={''}
                        position={columns.length}
                        index={columns.length}
                        setShow={setShowNewCard} />
                }
                <BoardCardComponent index={columns.length}>
                    <StyledAddAction onClick={createNewTask}>+ TASK</StyledAddAction>
                </BoardCardComponent>
            </ul>
        </StyledBoard>
    );

}