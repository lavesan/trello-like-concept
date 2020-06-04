import React, { forwardRef } from 'react';
import { Input, InputProps } from 'semantic-ui-react';

export default forwardRef((props: InputProps, ref: any) => {
    return <Input ref={ref} {...props} />
})
