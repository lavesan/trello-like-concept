import React, { useContext, useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import { ModalComponent } from '../';
import { AppContext } from '../../../App.context';
import { InputComponent } from '../../form/input';

export default () => {

    const {
        showCreateUserModal,
        setShowCreateUserModal,
        userService,
        reloadUsers,
    }                           = useContext(AppContext);
    const [form, setForm]         = useState<any>({
        name: '',
        email: '',
    });

    const toogleModal = () => {
        setShowCreateUserModal((f: boolean) => !f);
    }

    const onChange = (e: any) => {

        const { target } = e;
        setForm((f: any) => ({
            ...f,
            [target.name]: target.value,
        }));

    }

    const addTagToBoard = (e: any) => {

        e.preventDefault();
        if (!form.name || !form.email) {
            return;
        }

        userService.create(form)
            .then(() => {
                reloadUsers();
                toogleModal();
            })

    }

    return (
        <ModalComponent show={showCreateUserModal} toggleModal={toogleModal}>
            <Header as="h2">Criar usuário</Header>
            <Form onSubmit={addTagToBoard}>
                <Form.Field>
                    <label>Nome</label>
                    <InputComponent
                        value={form.name}
                        name="name"
                        onChange={onChange} />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <InputComponent
                        value={form.email}
                        name="email"
                        onChange={onChange} />
                </Form.Field>
                <Button floated='right' type='submit'>Criar</Button>
            </Form>
        </ModalComponent>
    )

}
