import React, { useState, useContext, useCallback, useEffect } from 'react';

import { BoardCardComponent } from '../board-card';
import { StyledCardComponent } from './card.styles';
import { ICardComponent, IShowTask } from './card.interfaces';
import { CircleImgComponent } from '../circle-img';
import { StyledTagButton } from '../tag-button';
import { StyledInvisibleInput } from '../invisible-input';
import emptyUser from '../../assets/imgs/empty-user.jpg';
import { AppContext } from '../../App.context';

export default (props: ICardComponent & IShowTask) => {

    const { boardService, setBoards } = useContext(AppContext);
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
                    // TODO: Alterar este card do board com o novo valor
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
                    // TODO: Dar um refresh nos cards com este novo cartão
                });
        }

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
    }, [titleInputRef])

    return (
        <BoardCardComponent data={props} index={props.index}>
            <StyledCardComponent onSubmit={onSubmit}>
                <StyledInvisibleInput
                    ref={getInputRef}
                    value={newTitle}
                    onChange={onChange}
                    onBlur={onBlur} />
                <footer className="card-aditionals">
                    <div className="card-aditionals--tags">
                        {props.tags.map(tag => <StyledTagButton>{tag.name}</StyledTagButton>)}
                    </div>
                    <div className="card-aditionals--tags">
                        {props.users.map(user => <CircleImgComponent imgUrl={user.imgUrl || emptyUser} />)}
                    </div>
                </footer>
            </StyledCardComponent>
        </BoardCardComponent>
    )

}
