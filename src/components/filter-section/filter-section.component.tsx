import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { StyledFilterSection } from './filter-section.styles';
import { StyledSearchInput } from '../search-input';
import { SlideDownComponent } from '../slide-down';
import { StyledTagButton } from '../tag-button';
import { CircleImgComponent } from '../circle-img';
import { AppContext } from '../../App.context';
import { ISearchCard } from '../../services/board.interfaces';
import { mapDataIntoBoards } from '../../helpers/boards.helpers';
import emptyUser from '../../assets/imgs/empty-user.jpg';

export default () => {

    const { boardService, board, setBoard } = useContext(AppContext);
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [filter, setFilter] = useState<ISearchCard>({
        q: '',
    });

    const visibilityAdvancedFilter = () => {
        setShowAdvanced(f => !f);
    }

    const onFieldChange = (e: any) => {
        setFilter(f => ({
            ...f,
            q: e.target.value,
        }))
    }

    useEffect(() => {
        boardService.getCards(filter)
            .then(res => {

                const mappedBoard = mapDataIntoBoards(board)

                setBoard(mappedBoard);

            });
    }, [filter])

    return (
        <StyledFilterSection>
            <h1>{board.name}</h1>
            <div>
                <div className="filter-input-container">
                    <StyledSearchInput
                        placeholder="Pesquisar"
                        value={filter.q}
                        onChange={onFieldChange} />
                    <button
                        type="button"
                        className="filter-input-container--advanced-button"
                        onClick={visibilityAdvancedFilter}>
                        FILTRO AVANÇADO
                        {showAdvanced
                            ? <FontAwesomeIcon className="filter-input-container--advanced-button--icon" icon={faChevronUp} />
                            : <FontAwesomeIcon className="filter-input-container--advanced-button--icon" icon={faChevronDown} />
                        }
                    </button>
                </div>
                <SlideDownComponent show={showAdvanced}>
                    <div className="advanced-filters-container">
                        <div className="advanced-filters-container--users">
                            {board.users.map(user => (
                                <button
                                    type="button"
                                    className="advanced-filters-container--users--user-tag"
                                    onClick={() => setFilter(f => ({ ...f, userIds: user._id }))}>
                                    <CircleImgComponent
                                        className="advanced-filters-container--users--image"
                                        selected={user._id === filter.userIds}
                                        imgUrl={user.imgUrl ? user.imgUrl : emptyUser} />
                                    <p
                                        className={`advanced-filters-container--users--name ${user._id === filter.userIds && 'selected-text'}`}
                                        >
                                        {user.name}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <div className="advanced-filters-container--divisor"></div>
                        <div className="advanced-filters-container--tags-container">
                            {board.tags.map(tag => (
                                <StyledTagButton
                                    type="button"
                                    selected={tag === filter.tagsIds}
                                    onClick={() => setFilter(f => ({ ...f, tagsIds: tag }))}>
                                    {tag}
                                </StyledTagButton>
                            ))}
                        </div>
                    </div>
                </SlideDownComponent>
            </div>
        </StyledFilterSection>
    )

}
