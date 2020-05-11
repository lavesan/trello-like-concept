import React, { useContext } from 'react';

import { StyledHome } from './home.styles';
import { AppContext } from '../../App.context';
import { BoardComponent } from '../../components/board';
import { StyledAddAction } from '../../components/add-action';
import { FilterSectionComponent } from '../../components/filter-section';

export default () => {

    const { boards } = useContext(AppContext);

    return (
        <StyledHome>
            <FilterSectionComponent />
            <section className="boards-section">
                {boards.map(board => <BoardComponent key={board.id} {...board} />)}
                <div>
                    <StyledAddAction>
                        + COLUNA
                    </StyledAddAction>
                </div>
            </section>
        </StyledHome>
    )

}
