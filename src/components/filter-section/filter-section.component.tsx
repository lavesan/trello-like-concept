import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { IFilterSectionComponent } from './filter-section.interfaces';
import { StyledFilterSection } from './filter-section.styles';
import { StyledSearchInput } from '../search-input';
import { SlideDownComponent } from '../slide-down';
import emptyUser from '../../assets/imgs/empty-user.jpg';

export default ({}: IFilterSectionComponent) => {

    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

    const visibilityAdvancedFilter = () => {
        setShowAdvanced(f => !f);
    }

    return (
        <StyledFilterSection>
            <h1>Título do quadro</h1>
            <div>
                <div className="filter-input-container">
                    <StyledSearchInput placeholder="Pesquisar" />
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
                            <button type="button" className="advanced-filters-container--users--user-tag">
                                <div className="advanced-filters-container--users--image">
                                    <img src={emptyUser} />
                                </div>
                                <p className="advanced-filters-container--users--name">Nome do usuário</p>
                            </button>
                        </div>
                        <div className="advanced-filters-container--divisor"></div>
                        <div className="advanced-filters-container--tags-container">
                            <button type="button" className="advanced-filters-container--tags-container--tag">TAG</button>
                        </div>
                    </div>
                </SlideDownComponent>
            </div>
        </StyledFilterSection>
    )

}
