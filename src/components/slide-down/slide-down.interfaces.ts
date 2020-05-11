import React from 'react';

export interface ISlideDownComponent {
    show: boolean;
    children: React.ReactNode;
}

export interface IStyledSlideDown {
    show: boolean;
    elemHeight: number;
}
