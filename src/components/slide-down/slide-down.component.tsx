import React, { useState, useCallback, useMemo } from 'react';

import { StyledSlideDown } from './slide-down.styles';
import { ISlideDownComponent } from './slide-down.interfaces';

export default ({ show, children }: ISlideDownComponent) => {

    const [slideRef, setSlideRef] = useState<HTMLDivElement | null>(null);

    const getRef = useCallback(
        (node: HTMLDivElement | null) => {
            setSlideRef(node);
        },
        []
    )

    const elemHeight = useMemo(
        () => {

            let totalHeight = 0;

            if (slideRef) {

                // Gets all the children to calculate it's height and margins
                const childrens = Array.from(slideRef.children);
                for (const children of childrens) {
                    // @ts-ignore
                    totalHeight += children.offsetHeight;
                    // @ts-ignore
                    const style = getComputedStyle(children);
                    totalHeight += parseInt(style.marginTop) + parseInt(style.marginBottom);
                }

            }

            return totalHeight;

        },
        [slideRef, show]
    )

    return (
        <StyledSlideDown ref={getRef} elemHeight={elemHeight} show={show}>
            {children}
        </StyledSlideDown>
    )

}
