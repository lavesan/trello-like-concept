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

    const { tags, users, boardService, setBoards, boards } = useContext(AppContext);
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

                const mappedBoards = mapDataIntoBoards({
                    boards,
                    tags,
                    users,
                    cards: res.data,
                })

                setBoards(mappedBoards);

            });
    }, [filter])

    return (
        <StyledFilterSection>
            <h1>Título do quadro</h1>
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
                            {users.map(user => (
                                <button
                                    type="button"
                                    className="advanced-filters-container--users--user-tag"
                                    onClick={() => setFilter(f => ({ ...f, userIds: user.id }))}>
                                    <CircleImgComponent
                                        className="advanced-filters-container--users--image"
                                        selected={user.id === filter.userIds}
                                        imgUrl={user.imgUrl ? user.imgUrl : emptyUser} />
                                    <p
                                        className={`advanced-filters-container--users--name ${user.id === filter.userIds && 'selected-text'}`}
                                        >
                                        {user.name}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <div className="advanced-filters-container--divisor"></div>
                        <div className="advanced-filters-container--tags-container">
                            {tags.map(tag => (
                                <StyledTagButton
                                    type="button"
                                    selected={tag.id === filter.tagsIds}
                                    onClick={() => setFilter(f => ({ ...f, tagsIds: tag.id }))}>
                                    {tag.name}
                                </StyledTagButton>
                            ))}
                        </div>
                    </div>
                </SlideDownComponent>
            </div>
        </StyledFilterSection>
    )

}
