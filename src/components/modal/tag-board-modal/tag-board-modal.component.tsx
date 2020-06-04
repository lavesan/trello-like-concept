import React, { useContext, useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import { ModalComponent } from '../';
import { AppContext } from '../../../App.context';
import { InputComponent } from '../../form/input';

export default () => {

    const {
        board,
        showTagBoardModal,
        setShowTagBoardModal,
        boardService,
        reloadBoards,
    }                           = useContext(AppContext);
    const [tag, setTag]         = useState<any>('');

    const toogleModal = () => {
        setShowTagBoardModal((f: boolean) => !f);
    }

    const addTagToBoard = (e: any) => {

        e.preventDefault();
        if (!tag) {
            return;
        }

        boardService.pushTagIntoBoard({
            tag,
            _id: board._id,
        })
            .then(() => {
                toogleModal();
                reloadBoards();
            })

    }

    return (
        <ModalComponent show={showTagBoardModal} toggleModal={toogleModal}>
            <Header as="h2">Adicionar tag no quadro</Header>
            <Form onSubmit={addTagToBoard}>
                <Form.Field>
                    <label>Tag</label>
                    <InputComponent
                        placeholder="Selecione um usuário"
                        value={tag}
                        onChange={(e: any) => {
                            setTag(e.target.value);
                        }} />
                </Form.Field>
                <Button floated='right' type='submit'>Adicionar</Button>
            </Form>
        </ModalComponent>
    )

}
