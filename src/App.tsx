import React, { useState } from 'react';

import { HomePage } from './views/home';
import { IBoard, ICard } from './views/home/home.interfaces';
import { AppContext } from './App.context';

function App() {

  const [draggedElem, setDraggedElem] = useState<ICard>({
    id: -1,
    text: '',
  });
  const [draggedPos, setDraggedPos] = useState<number>(0);
  const [boards, setBoards] = useState<IBoard[]>([]);

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
      <div className="App">
        <HomePage />
      </div>
    </AppContext.Provider>
  );

}

export default App;
