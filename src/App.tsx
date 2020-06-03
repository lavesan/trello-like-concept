import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

import { HomePage } from './views/home';
import { AppContext } from './App.context';
import BoardService from './services/board.service';
import theme from './App.theme';
import GlobalStyle from './global-styles';
import { ICardComponent } from './components/card/card.interfaces';
import { mapDataIntoBoards } from './helpers/boards.helpers';
import { IBoard } from './models/models.interfaces';

function App() {

  const [draggedElem, setDraggedElem]   = useState<ICardComponent | null>(null);
  const [draggedPos, setDraggedPos]     = useState<number>(0);
  const [board, setBoard]                 = useState<IBoard>({
    _id: '',
    name: '',
    tags: [],
    users: [],
    rows: [],
  });

  const boardService = BoardService.getInstance();

  const reloadBoards = useCallback(
    async () => {

      const boardsRes = await boardService.getBoard('5ed6fc8cda17dc4818761094')
        .catch(() => {
          return {
            data: {
              name: '',
              tags: [],
              users: [],
              rows: [],
            }
          };
        });
        
      const mappedBoards = mapDataIntoBoards(boardsRes.data);

      setBoard(mappedBoards);

    },
    [boardService]
  )

  useEffect(() => {
    reloadBoards();
  }, [reloadBoards])

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
          boardService,
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
