import React, { useState, useContext } from 'react';

import { ICardComponent } from './board-card.interfaces';
import { StyledBoardCard } from './board-card.styles';
import { AppContext } from '../../App.context';

export default ({ id, text, index }: ICardComponent) => {

    const { setDraggedElem, setDraggedPos } = useContext(AppContext);
    const [expandWidth, setExpandWidth] = useState<number>(0);

    const onDragStart = (e: any) => {
        const target = e.target;
        setDraggedElem({
            id,
            text,
        });

        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    };

    const onDragEnd = (e: any) => {
        const target = e.target;
        target.style.display = "list-item";
        // console.log("acabou");
    };

    const onDragEnter = (e: any) => {
        setDraggedPos(index);
        setExpandWidth(e.target.offsetHeight + 10);
    };

    const onDragExit = (e: any) => {
        setExpandWidth(0);
        // console.log("saiu: ", e.target);
        // e.target.style.paddingBottom = 0;
    };

    return (
        <StyledBoardCard
            expandWidth={expandWidth}
            draggable="true"
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragLeave={onDragExit}
        >
            {text}
        </StyledBoardCard>
    )

}
