import React from 'react';

import BoardService from './services/board.service';
import { ICardComponent } from './components/card/card.interfaces';
import { IBoardComponent } from './components/board/board.interfaces';
import { ITag, IUser } from './models/models.interfaces';

export const AppContext = React.createContext({
    draggedElem: {} as ICardComponent | IBoardComponent | null,
    setDraggedElem: (param: ICardComponent | IBoardComponent) => {},
    draggedPos: 0,
    setDraggedPos: (param: number) => {},
    boards: [] as IBoardComponent[],
    setBoards: (param: IBoardComponent[]) => {},
    boardService: BoardService.getInstance(),
    tags: [] as ITag[],
    setTags: (param: ITag[]) => {},
    users: [] as IUser[],
    setUsers: (param: IUser[]) => {},
    reloadBoards: () => {},
});