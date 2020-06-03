import { IBoard } from '../models/models.interfaces';

export const mapDataIntoBoards = (board: IBoard): IBoard => {

  const sortByPosition = (elem: any, nextElem: any) => {

    if (elem.position < nextElem.position) {
      return -1;
    } else if (elem.position > nextElem.position) {
      return 1;
    }
  
    return 0;

  }

  const mappedBoards = board.rows.map(row => {

    const sortedColumns = row.columns.sort(sortByPosition);

    return {
      ...row,
      columns: sortedColumns,
    }

  })

  return {
    ...board,
    rows: mappedBoards,
  };

}