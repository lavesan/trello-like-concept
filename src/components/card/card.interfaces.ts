import { IColumn } from "../../models/models.interfaces";

export interface ICardComponent extends IColumn {
    index: number;
    boardId: string;
}

export interface IShowTask {
    setShow?: (param: boolean) => void;
}