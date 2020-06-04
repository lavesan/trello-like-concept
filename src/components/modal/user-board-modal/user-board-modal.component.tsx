import React, { useContext, useState, useMemo } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import { ModalComponent } from '../';
import { AppContext } from '../../../App.context';
import { SelectComponent } from '../../form/select';

export default () => {

    const {
        board,
        showUserBoardModal,
        setShowUserBoardModal,
        users,
        boardService,
        reloadBoards,
    }                           = useContext(AppContext);
    const [user, setUser]       = useState<any>('');

    const mappedUsers = useMemo(
        () => {
            return users.map(user => ({
                ...user,
                key: user._id,
                value: user._id,
                text: user.name,
            }))
        },
        [users]
    )

    const toogleModal = () => {
        setShowUserBoardModal((f: boolean) => !f);
    }

    const addUserToBoard = (e: any) => {

        e.preventDefault();
        if (!user) {
            return;
        }

        boardService.pushUserIntoBoard({
            boardId: board._id,
            userId: user,
        })
            .then(() => {
                toogleModal();
                reloadBoards();
            })

    }

    return (
        <ModalComponent show={showUserBoardModal} toggleModal={toogleModal}>
            <Header as="h2">Adicionar usuário no quadro</Header>
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
