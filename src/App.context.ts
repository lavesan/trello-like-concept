import React from 'react';

import BoardService from './services/board.service';
import { ICardComponent } from './components/card/card.interfaces';
import { IBoard, IUser } from './models/models.interfaces';
import UserService from './services/user.service';
import { ISelectedColumn } from './App.interfaces';

export const AppContext = React.createContext({
    draggedElem: {} as ICardComponent | null,
    setDraggedElem: (param: ICardComponent) => {},
    draggedPos: 0,
    setDraggedPos: (param: number) => {},
    board: {} as IBoard,
    setBoard: (param: IBoard) => {},
    boards: [] as IBoard[],
    setBoards: (param: IBoard[]) => {},
    users: [] as IUser[],
    reloadBoards: () => {},
    reloadUsers: () => {},
    showUserBoardModal: false,
    setShowUserBoardModal: (param: any) => {},
    showUserColumnModal: false,
    setShowUserColumnModal: (param: any) => {},
    showTagBoardModal: false,
    setShowTagBoardModal: (param: any) => {},
    showTagColumnModal: false,
    setShowTagColumnModal: (param: any) => {},
    showCreateUserModal: false,
    setShowCreateUserModal: (param: any) => {},
    showMenu: false,
    setBoardFunction: (board: IBoard) => {},
    toogleMenu: () => {},
    hideMenu: () => {},
    boardService: BoardService.getInstance(),
    userService: UserService.getInstance(),
    selectedCard: {} as ISelectedColumn,
    setSelectedCard: (card: ISelectedColumn) => {},
});