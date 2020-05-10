import { ICard } from '../../views/home/home.interfaces';

export interface ICardComponent {
    index: number;
    children?: any;
    data?: ICard;
}

export interface IStyledBoard {
    expandHeight: number;
    transitionTime: number;
    deactivateTransition: boolean;
}
