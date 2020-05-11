import React, { useContext, useState } from 'react';

import { StyledHome } from './home.styles';
import { FilterSectionComponent } from '../../components/filter-section';
import { BoardsSectionComponent } from '../../components/boards-section';

export default () => (
    <StyledHome>
        <FilterSectionComponent />
        <BoardsSectionComponent />
    </StyledHome>
)
