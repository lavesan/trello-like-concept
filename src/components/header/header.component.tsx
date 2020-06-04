import React, { useContext } from 'react';
import { Icon, Button, Grid } from 'semantic-ui-react';
import { AppContext } from '../../App.context';

import { StyledHeaderComponent } from './header.styles';

export default () => {

    const { toogleMenu } = useContext(AppContext);

    return (
        <StyledHeaderComponent>
            <Grid className="open-menu">
                <Grid.Column>
                    <Button onClick={toogleMenu}>
                        <Icon size='big' name="align justify" style={{ margin: 0 }} />
                    </Button>
                </Grid.Column>
            </Grid>
        </StyledHeaderComponent>
    )

}
