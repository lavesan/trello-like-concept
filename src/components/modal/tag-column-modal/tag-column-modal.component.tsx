import React, { useContext, useState, useMemo } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import { ModalComponent } from '../';
import { AppContext } from '../../../App.context';
import { SelectComponent } from '../../form/select';

export default () => {

    const {
        board,
        selectedCard,
        showTagColumnModal,
        setShowTagColumnModal,
        boardService,
        reloadBoards,
    }                           = useContext(AppContext);
    const [tag, setTag]         = useState<any>('');

    const mappedTags = useMemo(
        () => {
            return board.tags.map(tag => ({
                key: tag,
                value: tag,
                text: tag,
            }))
        },
        [board]
    )

    const toogleModal = () => {
        setShowTagColumnModal((f: boolean) => !f);
    }

    const addUserToBoard = (e: any) => {

        e.preventDefault();
        if (!tag) {
            return;
        }

        boardService.pushTagIntoColumn({
            tag,
            columnId: selectedCard._id,
            boardId: board._id,
            rowId: selectedCard.rowId,
        })
            .then(() => {
                toogleModal();
                reloadBoards();
            })

    }

    return (
        <ModalComponent show={showTagColumnModal} toggleModal={toogleModal}>
            <Header as="h2">Adicionar tag no card</Header>
            <Form onSubmit={addUserToBoard}>
                <Form.Field>
                    <label>Tag</label>
                    <SelectComponent
                        placeholder="Selecione um usuário"
                        value={tag}
                        options={mappedTags}
                        onChange={(e: any, { value }) => {
                            setTag(value);
                        }} />
                </Form.Field>
                <Button floated='right' type='submit'>Adicionar</Button>
            </Form>
        </ModalComponent>
    )

}
