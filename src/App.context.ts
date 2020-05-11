import React from 'react';

import { IBoard, ICard } from './views/home/home.interfaces';
import BoardService from './services/board.service';

export const AppContext = React.createContext({
    draggedElem: {} as ICard | null,
    setDraggedElem: (param: ICard) => {},
    draggedPos: 0,
    setDraggedPos: (param: number) => {},
    boards: [] as IBoard[],
    setBoards: (param: IBoard[]) => {},
    boardService: BoardService.getInstance(),
});