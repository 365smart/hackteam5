import React from 'react';
import styled from 'styled-components';
import {
  color,
  space,
  border,
  typography
} from 'styled-system';

const StyledDiv = styled.div`
  position: fixed;
  z-index: 1000;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  display: flex;
  flex-direction: column;
  top:0;
  left:0;
  font-size: 66px;
  width: 100%;
  height: 100%;
  text-align: center;
  ${space}
  ${color}
  ${border}
  ${typography}
`;

export default (props) => {
  return (
    <StyledDiv {...props}>
      {props.children}
    </StyledDiv>
  )
}
