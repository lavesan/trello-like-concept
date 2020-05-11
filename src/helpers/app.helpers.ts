import { ICardComponent } from "../components/card/card.interfaces";
import { IBoardComponent } from "../components/board/board.interfaces";

export const objectToQueryString = (object: object) => {
    
    let queryString = '';
    const entries = Object.entries(object);
    entries.forEach(([key, value]) => {
        if (value) {
            queryString += `${queryString ? '&' : '?'}${key}=${value}`;
        }
    });
    return queryString;

}

export const instanceOfCardComponent = (object: any): object is ICardComponent => {
    return 'users' in object;
}

export const instanceOfBoardComponent = (object: any): object is IBoardComponent => {
    return 'cards' in object;
}
