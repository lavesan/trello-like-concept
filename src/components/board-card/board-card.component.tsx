import React, { useState, useContext, useRef, useEffect } from 'react';

import { IBoardCardComponent } from './board-card.interfaces';
import { StyledBoardCard } from './board-card.styles';
import { AppContext } from '../../App.context';

export default ({ index, children, data }: IBoardCardComponent) => {

    const { setDraggedElem, setDraggedPos, board } = useContext(AppContext);
    const [expandHeight, setExpandHeight] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const [deactivateTransition, setDeactivateTransition] = useState<boolean>(false);
    const elementRef = useRef(null);
    const itemRef = useRef(null);

    const transitionTime = 300;

    const onDragStart = (e: any) => {

        const target = e.target;
        if (data) {
            setDraggedElem(data);
        }

        setTimeout(() => {
            target.style.display = "none";
        }, 0);

    }

    const onDragEnd = (e: any) => {
        const target = e.target;
        target.style.display = "list-item";
    }

    const onDragEnter = (e: any) => {

        // For I.E
        e.preventDefault();
        setDraggedPos(index);
        // @ts-ignore
        const elemHeight = itemRef && itemRef.current ? itemRef.current.offsetHeight : 0;
        setExpandHeight(elemHeight);
        if (elementRef.current !== e.target) {
            setCounter(f => ++f);
        }

    }

    const onDragExit = async (e: any) => {
        if (elementRef.current === e.target && counter === 0) {
            setExpandHeight(0);
        }
        if (elementRef.current !== e.target) {
            setCounter(f => --f);
        }
    }

    useEffect(() => {
        setExpandHeight(0);
        setDeactivateTransition(true);
        setTimeout(() => {
            setDeactivateTransition(false);
        }, transitionTime)
    }, [board]);

    return (
        <StyledBoardCard
            ref={elementRef}
            expandHeight={expandHeight}
            deactivateTransition={deactivateTransition}
            transitionTime={transitionTime}
            onDragEnter={onDragEnter}
            onDragLeave={onDragExit}>
            <div
                ref={itemRef}
                className="card-container"
                draggable="true"
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}>
                {children}
            </div>
        </StyledBoardCard>
    )

}
