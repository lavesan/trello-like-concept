import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';

import { AppContext } from './App.context';
import BoardService from './services/board.service';
import UserService from './services/user.service';
import theme from './App.theme';
import GlobalStyle from './global-styles';
import { ICardComponent } from './components/card/card.interfaces';
import { mapDataIntoBoards } from './helpers/boards.helpers';
import { IBoard, IUser } from './models/models.interfaces';
import { SidebarComponent } from './components/sidebar';
import { emptyBoard } from './helpers/boards.helpers';
import { UserBoardModalComponent } from './components/modal/user-board-modal';
import { TagBoardModalComponent } from './components/modal/tag-board-modal';
import { CreateUserModalComponent } from './components/modal/create-user';
import { TagColumnModalComponent } from './components/modal/tag-column-modal';
import { UserColumnModalComponent } from './components/modal/add-column-user';
import { ISelectedColumn } from './App.interfaces';

function useForceUpdate(){
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => ++value); // update the state to force render
}

function App() {

  const [showUserBoardModal, setShowUserBoardModal]     = useState<boolean>(false);
  const [showUserColumnModal, setShowUserColumnModal]   = useState<boolean>(false);
  const [showTagBoardModal, setShowTagBoardModal]       = useState<boolean>(false);
  const [showTagColumnModal, setShowTagColumnModal]     = useState<boolean>(false);
  const [showCreateUserModal, setShowCreateUserModal]   = useState<boolean>(false);
  const [draggedElem, setDraggedElem]                   = useState<ICardComponent | null>(null);
  const [draggedPos, setDraggedPos]                     = useState<number>(0);
  const [boards, setBoards]                             = useState<IBoard[]>([]);
  const [board, setBoard]                               = useState<IBoard>(emptyBoard);
  const [users, setUsers]                               = useState<IUser[]>([]);
  const [selectedCard, setSelectedCard]                 = useState<ISelectedColumn>({} as ISelectedColumn);
  const [showMenu, setShowMenu]                         = useState<boolean>(false);
  const [reload, setReload]                             = useState<boolean>(true);
  const boardService                                    = BoardService.getInstance();
  const userService                                     = UserService.getInstance();

  const forceUpdate = useForceUpdate();

  const setBoardFunction = (board: IBoard) => {
    setBoard(mapDataIntoBoards(board));
    toogleMenu();
  }

  const toogleMenu = () => {
    setShowMenu(f => !f);
  }
  
  const hideMenu = () => {
    setShowMenu(false);
  }

  const reloadBoards = useCallback(
    async () => {

      const boardsRes = await boardService.getBoards()
        .catch(() => {
          return {
            data: [],
          };
        });
        
      setBoards(boardsRes.data);

    },
    [boardService]
  );

  const reloadUsers = useCallback(
    () => {

      userService.getAll()
        .then(({ data }) => {
          setUsers(data);
        })

    },
    [userService]
  );

  useEffect(() => {

    setBoard(f => {

      const foundBoard = boards.find(boardIterate => boardIterate._id === f._id);

      return foundBoard ? mapDataIntoBoards(foundBoard) : emptyBoard;

    });
    setTimeout(() => {
      setReload(false);
      setReload(true);
    }, 1)
  }, [boards]);

  useEffect(() => {
    reloadBoards();
    reloadUsers();
  }, [reloadBoards, reloadUsers]);

  return (
    <AppContext.Provider
      value={
        {
          draggedElem,
          setDraggedElem,
          draggedPos,
          setDraggedPos,
          board,
          setBoard,
          boards,
          setBoards,
          reloadUsers,
          reloadBoards,
          showUserBoardModal,
          setShowUserBoardModal,
          showUserColumnModal,
          setShowUserColumnModal,
          showTagBoardModal,
          setShowTagBoardModal,
          showTagColumnModal,
          setShowTagColumnModal,
          showCreateUserModal,
          setShowCreateUserModal,
          showMenu,
          hideMenu,
          toogleMenu,
          setBoardFunction,
          userService,
          boardService,
          users,
          selectedCard,
          setSelectedCard,
        }
      }>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {reload && <SidebarComponent />}
          <UserBoardModalComponent />
          <TagBoardModalComponent />
          <CreateUserModalComponent />
          <TagColumnModalComponent />
          <UserColumnModalComponent />
        </ThemeProvider>
    </AppContext.Provider>
  );

}

export default App;
