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

    const {
        boardService,
        reloadBoards,
        board,
        setShowTagColumnModal,
        setShowUserColumnModal,
        setSelectedCard,
    }                                           = useContext(AppContext);
    const [newTitle, setNewTitle]               = useState<string>(props.description);
    const [titleInputRef, setTitleInputRef]     = useState<HTMLInputElement | null>(null);

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
                boardId: board._id,
                description: newTitle,
                rowId: props.boardId,
                columnId: props._id,
            })
                .then(res => {
                    reloadBoards();
                });
        } else {

            boardService.createCard({
                description: newTitle,
                rowId: props.boardId,
            })
                .then(res => {
                    setNewTitle('');
                    reloadBoards();
                });
        }

    }

    const removeCard = () => {
        boardService.deleteCard({ columnId: props._id, rowId: props.boardId })
            .then(async () => {
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
                            <Dropdown.Item text='Adicionar Tag' onClick={() => {
                                setSelectedCard({ ...props, rowId: props.boardId });
                                setShowTagColumnModal(true);
                            }} />
                            <Dropdown.Item text='Adicionar Usuário' onClick={() => {
                                setSelectedCard({ ...props, rowId: props.boardId });
                                setShowUserColumnModal(true);
                            }} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="card-aditionals">
                    <div className="card-aditionals--tags">
                        {props.tags.map(tag => <StyledTagButton>{tag}</StyledTagButton>)}
                    </div>
                    <div className="card-aditionals--tags">
                        {props.users.map(user => <CircleImgComponent title={user.name} imgUrl={user.imgUrl || emptyUser} />)}
                    </div>
                </div>
            </StyledCardComponent>
        </BoardCardComponent>
    )

}
