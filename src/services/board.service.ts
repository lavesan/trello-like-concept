import axios from 'axios';

class BoardService {

    getBoards() {
        return axios.get('board')
    }

    getBoard(boardId: string) {
        return axios.get(`board/${boardId}`)
    }

    createBoard(board: any) {
        return axios.post('board/column', board);
    }

    updateRow(body: any) {
        return axios.put('board/row', body);
    }

    createRow(board: any) {
        return axios.post('board/row', board);
    }

    deleteRow(rowId: string) {
        return axios.delete(`board/row/${rowId}`);
    }

    // getCards(query: ISearchCard = {} as ISearchCard): Promise<AxiosResponse<IColumn[]>> {
    //     return axios.get(`cards${objectToQueryString(query)}`);
    // }

    createCard(card: any) {
        return axios.post(`board/column`, card);
    }

    updateCard(body: any) {
        return axios.put('board/column', body);
    }

    deleteCard({ columnId, rowId }: any) {
        return axios.delete(`board/column/${columnId}/row/${rowId}`);
    }

    pushTagIntoBoard({ _id, tag }: any) {
        return axios.put('board/tag',{
            tag,
            boardId: _id,
        });
    }

    pushUserIntoBoard({ boardId, userId }: any) {
        return axios.put('board/add-user',{
            userId,
            boardId,
        });
    }

    pushUserIntoColumn({ columnId, boardId, userId, rowId }: any) {
        return axios.put('board/column/add-user',{
            rowId,
            userId,
            boardId,
            columnId,
        });
    }

    pushTagIntoColumn({ columnId, tag, boardId, rowId }: any) {
        return axios.put('board/column/tag',{
            tag,
            boardId,
            rowId,
            columnId,
        });
    }

    moveColumn(body: any) {
        return axios.put('board/column/move', body)
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
