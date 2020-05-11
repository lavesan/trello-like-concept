import { IBoard, ICard, ITag, IUser } from "../models/models.interfaces";

export interface IMapIntoBoards {
    boards: IBoard[];
    tags: ITag[];
    users: IUser[];
    cards: ICard[];
}