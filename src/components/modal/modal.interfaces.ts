import React from 'react';

export interface IModalComponent {
    show: boolean;
    children: React.ReactNode;
    toggleModal: () => void;
}