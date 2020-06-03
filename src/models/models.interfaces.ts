// ICard
export interface IColumn {
    _id: string;
    description: string;
    users: IUser[];
    tags: ITag[];
    position: number;
}

export interface IBoard {
    _id: string;
    name: string;
    rows: IRow[];
    tags: ITag[];
    users: IUser[];
}

// IBoard
export interface IRow {
    _id: string;
    name: string;
    columns: IColumn[]
}

export type ITag  = string;

export interface IUser {
    _id: string;
    name: string;
    imgUrl: string;
}
