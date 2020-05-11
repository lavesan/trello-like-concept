import { ICardComponent } from '../card/card.interfaces';

export interface IBoardCardComponent {
    index: number;
    children?: any;
    data?: ICardComponent;
}

export interface IStyledBoard {
    expandHeight: number;
    transitionTime: number;
    deactivateTransition: boolean;
}
