import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { HomePage } from './views/home';
import { IBoard, ICard } from './views/home/home.interfaces';
import { AppContext } from './App.context';
import theme from './App.theme';
import GlobalStyle from './global-styles';

function App() {

  const [draggedElem, setDraggedElem] = useState<ICard>({
    id: -1,
    text: '',
  });
  const [draggedPos, setDraggedPos] = useState<number>(0);
  const [boards, setBoards] = useState<IBoard[]>([
    {
      id: 1,
      name: 'Quadro 1',
      cards: [
        {
          id: 1,
          text: 'Isso aqui escrito',
        },
        {
          id: 2,
          text: 'Agora tem isso aque',
        },
      ],
    },
    {
      id: 2,
      name: 'Quadro 1',
      cards: [
        {
          id: 3,
          text: 'Algo aqui',
        },
      ],
    },
  ]);

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
