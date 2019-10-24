import React from 'react';
import { createGlobalStyle, styled } from 'styled-components'
import {
  color,
} from 'styled-system';
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
