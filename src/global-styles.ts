import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    body {
        margin: 0;
        width: 100vw;
        min-width: 100vw;
        overflow: hidden;
    }

    #root, .ui.segment.pushable {
        min-height: 100vh;
    }
`
