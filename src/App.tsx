import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';

import { HomePage } from './views/home';
import { IBoard, ICard } from './views/home/home.interfaces';
import { AppContext } from './App.context';
import BoardService from './services/board.service';
import theme from './App.theme';
import GlobalStyle from './global-styles';

function App() {

  const [draggedElem, setDraggedElem] = useState<ICard | null>(null);
  const [draggedPos, setDraggedPos] = useState<number>(0);
  const [boards, setBoards] = useState<IBoard[]>([]);

  const boardService = BoardService.getInstance();

  const loadData = useCallback(
    async () => {

      const boardsRes = await boardService.getBoards()
        .catch(() => {
          return [];
        });
      const cardsRes = await boardService.getCards()
        .catch(() => {
          return [];
        });
      const tagsRes = await boardService.getTags()
        .catch(() => {
          return [];
        });
      const usersRes = await boardService.getUsers()
        .catch(() => {
          return [];
        });

        // @ts-ignore
        const mappedBoards = boardsRes.data.map(board => {
          
          // @ts-ignore
          const cards = cardsRes.data.filter(card => card.boardId === board.id);

          const mappedCards = cards.map((card: ICard) => {
            
            // @ts-ignore
            const usersOnCard = usersRes.data.filter(user => card.userIds.includes(user.id));
            // @ts-ignore
            const tagsOnCard = tagsRes.data.filter(tag => card.boardId === tag.id);

            return {
              ...card,
              users: usersOnCard,
              tags: tagsOnCard,
            }

          });

          return {
            ...board,
            cards: mappedCards,
          }

      })

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
