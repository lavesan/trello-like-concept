import React, { useContext, useState } from 'react';

import { StyledBoardsSection } from './boards-section.styles';
import { AppContext } from '../../App.context';
import { instanceOfBoardComponent } from '../../helpers/app.helpers';
import { BoardComponent } from '../board';
import { StyledAddAction } from '../add-action';

export default () => {

    const { boards } = useContext(AppContext);
    const [showNewBoard, setShowNewBoard] = useState<boolean>(false);

    const createNewBoard = () => {
        setShowNewBoard(true);
    }

    return (
        <StyledBoardsSection>
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
        </StyledBoardsSection>
    )

}
