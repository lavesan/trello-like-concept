import { IColumn } from "./models/models.interfaces";

export interface ISelectedColumn extends IColumn {
    rowId: string;
}