import React, { useState, useContext } from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';

import { StyledFilterSection } from './filter-section.styles';
// import { StyledSearchInput } from '../search-input';
// import { SlideDownComponent } from '../slide-down';
import { StyledTagButton } from '../tag-button';
import { CircleImgComponent } from '../circle-img';
import { AppContext } from '../../App.context';
import { ISearchCard } from '../../services/board.interfaces';
import emptyUser from '../../assets/imgs/empty-user.jpg';

export default () => {

    const { board, setShowTagBoardModal, setShowUserBoardModal } = useContext(AppContext);
    // const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [filter, setFilter] = useState<ISearchCard>({
        q: '',
    });

    const toogleUserBoardModal = () => {
        setShowUserBoardModal((f: boolean) => !f);
    }

    const toogleTagBoardModal = () => {
        setShowTagBoardModal((f: boolean) => !f);
    }

    // const visibilityAdvancedFilter = () => {
    //     setShowAdvanced(f => !f);
    // }

    // const onFieldChange = (e: any) => {
    //     setFilter(f => ({
    //         ...f,
    //         q: e.target.value,
    //     }))
    // }

    // useEffect(() => {
    //     boardService.getCards(filter)
    //         .then(res => {
    //             reloadBoards();
    //         });
    // }, [filter])

    return (
        <StyledFilterSection>
            <Header as='h1' color='grey'>{board.name}</Header>
            <div>
                {/* <div className="filter-input-container">
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
                <SlideDownComponent show={showAdvanced}> */}
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
                {/* </SlideDownComponent> */}
                <Grid className="modal-actions">
                    <Grid.Column mobile={16} tablet={4} computer={3}>
                        <Button style={{ width: '100%' }} onClick={toogleUserBoardModal}>Adicionar usuário</Button>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={4} computer={3}>
                        <Button style={{ width: '100%' }} onClick={toogleTagBoardModal}>Adicionar tag</Button>
                    </Grid.Column>
                </Grid>
            </div>
        </StyledFilterSection>
    )

}
