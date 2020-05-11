import { ICard, ITag, IUser } from "../../models/models.interfaces";

export interface ICardComponent extends ICard {
    index: number;
    tags: ITag[];
    users: IUser[];
}

export interface IShowTask {
    setShow?: (param: boolean) => void;
}