import React, { useContext, useState, useMemo } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import { ModalComponent } from '../';
import { AppContext } from '../../../App.context';
import { SelectComponent } from '../../form/select';

export default () => {

    const {
        board,
        selectedCard,
        showUserColumnModal,
        setShowUserColumnModal,
        boardService,
        reloadBoards,
    }                           = useContext(AppContext);
    const [user, setUser]         = useState<any>('');

    const mappedUsers = useMemo(
        () => {
            return board.users.map(user => ({
                key: user._id,
                value: user._id,
                text: user.name,
            }))
        },
        [board]
    )

    const toogleModal = () => {
        setShowUserColumnModal((f: boolean) => !f);
    }

    const addUserToBoard = (e: any) => {

        e.preventDefault();
        if (!user) {
            return;
        }

        boardService.pushUserIntoColumn({
            rowId: selectedCard.rowId,
            userId: user,
            boardId: board._id,
            columnId: selectedCard._id,
        })
            .then(() => {
                toogleModal();
                reloadBoards();
            })

    }

    return (
        <ModalComponent show={showUserColumnModal} toggleModal={toogleModal}>
            <Header as="h2">Adicionar usuário no card</Header>
            <Form onSubmit={addUserToBoard}>
                <Form.Field>
                    <label>Usuário</label>
                    <SelectComponent
                        placeholder="Selecione um usuário"
                        value={user}
                        options={mappedUsers}
                        onChange={(e: any, { value }) => {
                            setUser(value);
                        }} />
                </Form.Field>
                <Button floated='right' type='submit'>Adicionar</Button>
            </Form>
        </ModalComponent>
    )

}
