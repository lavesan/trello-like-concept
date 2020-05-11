import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';

import { HomePage } from './views/home';
import { ICard, ITag, IUser } from './models/models.interfaces';
import { AppContext } from './App.context';
import BoardService from './services/board.service';
import theme from './App.theme';
import GlobalStyle from './global-styles';
import { ICardComponent } from './components/card/card.interfaces';
import { IBoardComponent } from './components/board/board.interfaces';
import { mapDataIntoBoards } from './helpers/boards.helpers';

function App() {

  const [draggedElem, setDraggedElem] = useState<ICardComponent | null>(null);
  const [draggedPos, setDraggedPos] = useState<number>(0);
  const [boards, setBoards] = useState<IBoardComponent[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const boardService = BoardService.getInstance();

  const loadData = useCallback(
    async () => {

      const boardsRes = await boardService.getBoards()
        .catch(() => {
          return { data: [] };
        });
      const cardsRes = await boardService.getCards()
        .catch(() => {
          return { data: [] };
        });
      const tagsRes = await boardService.getTags()
        .catch(() => {
          return { data: [] };
        });
      const usersRes = await boardService.getUsers()
        .catch(() => {
          return { data: [] };
        });

      setTags(tagsRes.data);
      setUsers(usersRes.data);

      const mappedBoards = mapDataIntoBoards({
        boards: boardsRes.data,
        cards: cardsRes.data,
        users: usersRes.data,
        tags: tagsRes.data,
      });

      setBoards(mappedBoards);

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
