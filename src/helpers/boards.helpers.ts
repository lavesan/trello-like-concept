import { IMapIntoBoards } from './boards.interfaces';
import { IBoardComponent } from '../components/board/board.interfaces';

export const mapDataIntoBoards = ({ boards, tags, users, cards }: IMapIntoBoards): IBoardComponent[] => {
    return boards.map(board => {

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

        return {
          ...board,
          cards: mappedCards,
        }

    })
}