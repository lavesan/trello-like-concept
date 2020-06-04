import React from 'react';
import Modal from "react-responsive-modal";

import { IModalComponent } from './modal.interfaces';
import { StyledModalComponent } from './modal.styles';

export default class ModalComponent extends React.Component<IModalComponent> {

  render() {

    const { show, children, toggleModal } = this.props;

    return (
      <Modal open={show} onClose={toggleModal} center>
        <StyledModalComponent>
            {children}
        </StyledModalComponent>
      </Modal>
    );
  }
};
