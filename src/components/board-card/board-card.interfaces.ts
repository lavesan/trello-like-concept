import { ICard } from '../../views/home/home.interfaces';

export interface ICardComponent extends ICard {
    index: number;
}

export interface IStyledBoard {
    expandWidth: number;
}
