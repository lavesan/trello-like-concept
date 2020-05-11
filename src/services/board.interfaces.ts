import { ICard } from "../models/models.interfaces";

export interface ISearchCard {
    q?: string;
    tagsIds?: number;
    userIds?: number;
}