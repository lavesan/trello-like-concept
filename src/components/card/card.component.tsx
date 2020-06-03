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

    const { boardService, reloadBoards, board } = useContext(AppContext);
    const [newTitle, setNewTitle] = useState<string>(props.description);
    const [titleInputRef, setTitleInputRef] = useState<HTMLInputElement | null>(null);

    const onChange = (e: any) => {
        setNewTitle(e.target.value);
    }

    const onBlur = () => {

        if (!props._id && props.setShow) {
            props.setShow(false);
        }
        setNewTitle(props.description);

    }

    const onSubmit = (e: any) => {

        e.preventDefault();
        if (props._id) {
            boardService.updateCard({
                ...props,
                description: newTitle,
            })
                .then(res => {
                    reloadBoards();
                });
        } else {

            boardService.createCard({
                description: newTitle,
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

        const row = board.rows.find(row => row._id === props.boardId);

        // TODO: Deixar meu backend cuidando de tudo isso ai que tem no then
        boardService.deleteCard(props._id)
            .then(async () => {

                if (row) {

                    let lastPosition = -1;
                    for (const card of row.columns) {
    
                        if (card._id !== props._id) {
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
        if (!props._id && titleInputRef) {
            titleInputRef.focus();
        }
    }, [titleInputRef, props._id])

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
                        {props.tags.map(tag => <StyledTagButton>{tag}</StyledTagButton>)}
                    </div>
                    <div className="card-aditionals--tags">
                        {props.users.map(user => <CircleImgComponent imgUrl={user.imgUrl || emptyUser} />)}
                    </div>
                </div>
            </StyledCardComponent>
        </BoardCardComponent>
    )

}
