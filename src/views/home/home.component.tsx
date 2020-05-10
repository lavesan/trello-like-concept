import React, { useContext } from 'react';

import { StyledHome } from './home.styles';
import { AppContext } from '../../App.context';
import { BoardComponent } from '../../components/board';

export default () => {

    const { boards } = useContext(AppContext);

    return (
        <StyledHome>
            <section className="boards-section">
                {boards.map(board => <BoardComponent key={board.id} {...board} />)}
            </section>
        </StyledHome>
    )

}
