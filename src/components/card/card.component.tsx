import React, { useState, useContext, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'semantic-ui-react';

import { BoardCardComponent } from '../board-card';
import { StyledCardComponent } from './card.styles';
import { ICardComponent, IShowTask } from './card.interfaces';
import { CircleImgComponent } from '../circle-img';
import { StyledTagButton } from '../tag-button';
import { StyledInvisibleInput } from '../invisible-input';
import emptyUser from '../../assets/imgs/empty-user.jpg';
import { AppContext } from '../../App.context';

export default (props: ICardComponent & IShowTask) => {

    const { boardService, reloadBoards, boards } = useContext(AppContext);
    const [newTitle, setNewTitle] = useState<string>(props.title);
    const [titleInputRef, setTitleInputRef] = useState<HTMLInputElement | null>(null);

    const onChange = (e: any) => {
        setNewTitle(e.target.value);
    }

    const onBlur = () => {

        if (!props.id && props.setShow) {
            props.setShow(false);
        }
        setNewTitle(props.title);

    }

    const onSubmit = (e: any) => {

        e.preventDefault();
        if (props.id) {
            boardService.updateCard({
                ...props,
                title: newTitle,
            })
                .then(res => {
                    reloadBoards();
                });
        } else {

            boardService.createCard({
                title: newTitle,
                boardId: props.boardId,
                position: props.index,
                tagsIds: [],
                userIds: [],
            })
                .then(res => {
                    setNewTitle('');
                    reloadBoards();
                });
        }

    }

    const removeCard = () => {

        const board = boards.find(boar => boar.id === props.boardId);

        boardService.deleteCard(props.id)
            .then(async () => {

                if (board) {

                    let lastPosition = -1;
                    for (const card of board.cards) {
    
                        if (card.id !== props.id) {
                            lastPosition++;
                            await boardService.updateCard({
                                ...card,
                                position: lastPosition,
                            })
                        }
    
                    }

                }
                reloadBoards();
            });

    }

    const getInputRef = useCallback(
        (node) => {
            setTitleInputRef(node);
        },
        [setTitleInputRef]
    )

    useEffect(() => {
        if (!props.id && titleInputRef) {
            titleInputRef.focus();
        }
    }, [titleInputRef, props.id])

    return (
        <BoardCardComponent data={props} index={props.index}>
            <StyledCardComponent onSubmit={onSubmit}>
                <div className="card-info-container">
                    <StyledInvisibleInput
                        ref={getInputRef}
                        value={newTitle}
                        onChange={onChange}
                        onBlur={onBlur} />
                    <Dropdown className="card-info-container--dropdown" icon={<FontAwesomeIcon icon={faEllipsisV} />}>
                        <Dropdown.Menu>
                            <Dropdown.Item text='Excluir' onClick={removeCard} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="card-aditionals">
                    <div className="card-aditionals--tags">
                        {props.tags.map(tag => <StyledTagButton>{tag.name}</StyledTagButton>)}
                    </div>
                    <div className="card-aditionals--tags">
                        {props.users.map(user => <CircleImgComponent imgUrl={user.imgUrl || emptyUser} />)}
                    </div>
                </div>
            </StyledCardComponent>
        </BoardCardComponent>
    )

}
