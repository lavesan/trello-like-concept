import React from 'react';

import { BoardCardComponent } from '../board-card';
import { StyledCardComponent } from './card.styles';
import { ICardComponent } from './card.interfaces';

export default (props: ICardComponent) => {

    return (
        <BoardCardComponent data={props} index={props.index}>
            <StyledCardComponent>
                <p className="title-text">{props.title}</p>
                <footer className="card-aditionals">
                    <div className="card-aditionals--tags">
                        {props.users.map(user => <div />)}
                    </div>
                    <div className="card-aditionals--tags">
                        {props.tags.map(tag => <div />)}
                    </div>
                </footer>
            </StyledCardComponent>
        </BoardCardComponent>
    )

}
