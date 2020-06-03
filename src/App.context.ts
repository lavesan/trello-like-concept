import React from 'react';

import BoardService from './services/board.service';
import { ICardComponent } from './components/card/card.interfaces';
import { IBoard } from './models/models.interfaces';

export const AppContext = React.createContext({
    draggedElem: {} as ICardComponent | null,
    setDraggedElem: (param: ICardComponent) => {},
    draggedPos: 0,
    setDraggedPos: (param: number) => {},
    board: {} as IBoard,
    setBoard: (param: IBoard) => {},
    boardService: BoardService.getInstance(),
    reloadBoards: () => {},
});