import React from 'react';

import { IBoard, ICard } from './views/home/home.interfaces';

export const AppContext = React.createContext({
    draggedElem: {} as ICard,
    setDraggedElem: (param: ICard) => {},
    draggedPos: 0,
    setDraggedPos: (param: number) => {},
    boards: [] as IBoard[],
    setBoards: (param: IBoard[]) => {},
});