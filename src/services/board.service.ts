import axios from 'axios';
import { ICard, IBoard, ITag, IUser } from '../views/home/home.interfaces';

class BoardService {

    getUsers(): Promise<IUser[]> {
        return axios.get(`${process.env.REACT_APP_API_URL}users`);
    }

    getTags(): Promise<ITag[]> {
        return axios.get(`${process.env.REACT_APP_API_URL}tags`);
    }

    getBoards(): Promise<IBoard[]> {
        return axios.get(`${process.env.REACT_APP_API_URL}boards`);
    }

    createBoard(board: IBoard) {
        return axios.post(`${process.env.REACT_APP_API_URL}boards`, board);
    }

    updateBoard(board: IBoard) {
        return axios.patch(`${process.env.REACT_APP_API_URL}boards`, board);
    }

    deleteBoard(boardId: number) {
        return axios.delete(`${process.env.REACT_APP_API_URL}boards/${boardId}`);
    }

    getCards(): Promise<ICard[]> {
        return axios.get(`${process.env.REACT_APP_API_URL}cards`);
    }

    createCard(card: ICard) {
        return axios.post(`${process.env.REACT_APP_API_URL}cards`, card);
    }

    updateCard(card: ICard) {
        return axios.patch(`${process.env.REACT_APP_API_URL}cards`, card);
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
