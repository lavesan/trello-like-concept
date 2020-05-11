import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import 'semantic-ui/dist/semantic.min.css';

import { HomePage } from './views/home';
import { ITag, IUser } from './models/models.interfaces';
import { AppContext } from './App.context';
import BoardService from './services/board.service';
import theme from './App.theme';
import GlobalStyle from './global-styles';
import { ICardComponent } from './components/card/card.interfaces';
import { IBoardComponent } from './components/board/board.interfaces';
import { mapDataIntoBoards } from './helpers/boards.helpers';

function App() {

  const [draggedElem, setDraggedElem] = useState<ICardComponent | IBoardComponent | null>(null);
  const [draggedPos, setDraggedPos] = useState<number>(0);
  const [boards, setBoards] = useState<IBoardComponent[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const boardService = BoardService.getInstance();

  const reloadBoards = async () => {

    const boardsRes = await boardService.getBoards()
      .catch(() => {
        return { data: [] };
      });
    const cardsRes = await boardService.getCards()
      .catch(() => {
        return { data: [] };
      });
      
    const mappedBoards = mapDataIntoBoards({
      tags,
      users,
      boards: boardsRes.data,
      cards: cardsRes.data,
    });

    setBoards(mappedBoards);

  }

  const loadData = useCallback(
    async () => {

      const tagsRes = await boardService.getTags()
        .catch(() => {
          return { data: [] };
        });
      const usersRes = await boardService.getUsers()
        .catch(() => {
          return { data: [] };
        });

      await setTags(tagsRes.data);
      await setUsers(usersRes.data);

      reloadBoards();

    },
    [boardService]
  )

  useEffect(() => {
    loadData();
  }, [loadData])

  return (
    <AppContext.Provider
      value={
        {
          draggedElem,
          setDraggedElem,
          draggedPos,
          setDraggedPos,
          boards,
          setBoards,
          boardService,
          users,
          setUsers,
          tags,
          setTags,
          reloadBoards,
        }
      }>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className="App">
            <HomePage />
          </div>
        </ThemeProvider>
    </AppContext.Provider>
  );

}

export default App;
