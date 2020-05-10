export interface ICard {
    id: number;
    text: string;
}

export interface IBoard {
    id: number;
    name: string;
    cards: ICard[];
}