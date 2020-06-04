import React from 'react';
import { Select, SelectProps } from 'semantic-ui-react';

import { ISelectComponent } from './select.interfaces';

export default (props: ISelectComponent & SelectProps) => {

    return <Select {...props} />

}
