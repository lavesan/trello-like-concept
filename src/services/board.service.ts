import axios, { AxiosResponse } from 'axios';
import { IColumn, IRow, ITag, IUser } from '../models/models.interfaces';
import { objectToQueryString } from '../helpers/app.helpers';
import { ISearchCard } from './board.interfaces';

class BoardService {

    getBoards() {
        return axios.get('board')
    }

    getBoard(boardId: string) {
        return axios.get(`board/${boardId}`)
    }

    // getUsers(): Promise<AxiosResponse<IUser[]>> {
    //     return axios.get(`users`);
    // }

    // getTags(): Promise<AxiosResponse<ITag[]>> {
    //     return axios.get(`tags`);
    // }

    // getBoards(): Promise<AxiosResponse<IBoard[]>> {
    //     return axios.get(`boards`);
    // }

    createBoard(board: any) {
        return axios.post('board', board);
    }

    updateBoard({ id, ...body }: any) {
        return axios.patch('board', { boardId: id, ...body });
    }

    createRow(board: Partial<IRow>) {
        return axios.post('board/row', board);
    }

    updateRow({ _id, ...body }: IRow) {
        return axios.patch('board/row', { boardId: _id, ...body });
    }

    deleteRow(rowId: string) {
        return axios.delete(`board/row/${rowId}`);
    }

    getCards(query: ISearchCard = {} as ISearchCard): Promise<AxiosResponse<IColumn[]>> {
        return axios.get(`cards${objectToQueryString(query)}`);
    }

    createCard(card: any) {
        return axios.post(`board/column`, card);
    }

    updateCard({ _id, ...body }: IColumn) {
        return axios.patch('board/column', { boardId: _id, ...body });
    }

    deleteCard(cardId: string) {
        return axios.delete(`cards/${cardId}`);
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
