import React, { useContext, useState } from 'react';

import { StyledHome } from './home.styles';
import { AppContext } from '../../App.context';
import { BoardComponent } from '../../components/board';
import { StyledAddAction } from '../../components/add-action';
import { FilterSectionComponent } from '../../components/filter-section';

export default () => {

    const { boards } = useContext(AppContext);
    const [showNewBoard, setShowNewBoard] = useState<boolean>(false);

    const createNewBoard = () => {
        setShowNewBoard(true);
    }

    return (
        <StyledHome>
            <FilterSectionComponent />
            <section className="boards-section">
                {boards.map(board => <BoardComponent key={board.id} {...board} />)}
                {showNewBoard && (
                    <BoardComponent
                        id={0}
                        name=""
                        position={boards.length}
                        cards={[]}
                        setShow={setShowNewBoard} />
                )}
                <div>
                    <StyledAddAction onClick={createNewBoard}>
                        + COLUNA
                    </StyledAddAction>
                </div>
            </section>
        </StyledHome>
    )

}
