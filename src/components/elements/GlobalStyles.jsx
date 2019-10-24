import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', -apple-system, sans-serif;
  }

  body {
    margin: 0;
    background: ${p => p.theme.colors.background};
  }
`
export default GlobalStyle;
