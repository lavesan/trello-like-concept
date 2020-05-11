export interface ICard {
    id: number;
    title: string;
    boardId: number;
    userIds: number[];
    position: number;
}

export interface IBoard {
    id: number;
    name: string;
    cards: ICard[];
    position: number;
}

export interface ITag {
    id: number;
    name: string;
}

export interface IUser {
    id: number;
    name: string;
    imgUrl: string;
}
