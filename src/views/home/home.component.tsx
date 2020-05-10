import React, { useContext } from 'react';

import { StyledHome } from './home.styles';
import { AppContext } from '../../App.context';
import { BoardComponent } from '../../components/board';
import { StyledAddAction } from '../../components/add-action';
import { StyledSearchInput } from '../../components/search-input';

export default () => {

    const { boards } = useContext(AppContext);

    return (
        <StyledHome>
            <section>
                <h1>Título do quadro</h1>
                <div>
                    <div className="filter-input-container">
                        <StyledSearchInput placeholder="Pesquisar" />
                        <button>FILTRO AVANÇADO</button>
                    </div>
                    <div>

                    </div>
                </div>
            </section>
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
