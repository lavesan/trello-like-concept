import axios, { AxiosResponse } from 'axios';
import { ICard, IBoard, ITag, IUser } from '../models/models.interfaces';
import { objectToQueryString } from '../helpers/app.helpers';
import { ISearchCard } from './board.interfaces';

class BoardService {

    getUsers(): Promise<AxiosResponse<IUser[]>> {
        return axios.get(`${process.env.REACT_APP_API_URL}users`);
    }

    getTags(): Promise<AxiosResponse<ITag[]>> {
        return axios.get(`${process.env.REACT_APP_API_URL}tags`);
    }

    getBoards(): Promise<AxiosResponse<IBoard[]>> {
        return axios.get(`${process.env.REACT_APP_API_URL}boards`);
    }

    createBoard(board: Partial<IBoard>) {
        return axios.post(`${process.env.REACT_APP_API_URL}boards`, board);
    }

    updateBoard({ id, ...body }: IBoard) {
        return axios.patch(`${process.env.REACT_APP_API_URL}boards/${id}`, body);
    }

    deleteBoard(boardId: number) {
        return axios.delete(`${process.env.REACT_APP_API_URL}boards/${boardId}`);
    }

    getCards(query: ISearchCard = {} as ISearchCard): Promise<AxiosResponse<ICard[]>> {
        return axios.get(`${process.env.REACT_APP_API_URL}cards${objectToQueryString(query)}`);
    }

    createCard(card: Partial<ICard>) {
        return axios.post(`${process.env.REACT_APP_API_URL}cards`, card);
    }

    updateCard({ id, ...body }: ICard) {
        return axios.patch(`${process.env.REACT_APP_API_URL}cards/${id}`, body);
    }

    deleteCard(cardId: number) {
        return axios.delete(`${process.env.REACT_APP_API_URL}cards/${cardId}`);
    }

}

let boardServiceInstance: BoardService | null = null;

export default (() => {

    const getInstance = () => {
    
        if (!boardServiceInstance) {
            boardServiceInstance = new BoardService();
        }
        return boardServiceInstance;
    
    }
    
    return {
        getInstance,
    }

})()
