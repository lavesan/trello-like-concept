import { IBoard } from "../../models/models.interfaces";
import { ICardComponent } from "../card/card.interfaces";

export interface IBoardComponent extends IBoard {
    cards: ICardComponent[];
}