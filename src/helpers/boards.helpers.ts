import { IMapIntoBoards } from './boards.interfaces';
import { IBoardComponent } from '../components/board/board.interfaces';

export const mapDataIntoBoards = ({ boards, tags, users, cards }: IMapIntoBoards): IBoardComponent[] => {

  const sortByPosition = (elem: any, nextElem: any) => {

    if (elem.position < nextElem.position) {
      return -1;
    } else if (elem.position > nextElem.position) {
      return 1;
    }
  
    return 0;

  }

  const mappedBoards = boards.map(board => {

    const filteredCards = cards.filter(card => card.boardId === board.id);

    const mappedCards = filteredCards.map(card => {

      const usersOnCard = users.filter(user => card.userIds.includes(user.id));
      const tagsOnCard = tags.filter(tag => card.tagsIds.includes(tag.id));

      return {
        ...card,
        index: 0,
        users: usersOnCard,
        tags: tagsOnCard,
      }

    });


    const sortedCards = mappedCards.sort(sortByPosition);

    return {
      ...board,
      cards: mappedCards,
    }

  })

  return mappedBoards.sort(sortByPosition);

}