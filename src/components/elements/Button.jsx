import React from 'react';
import styled from 'styled-components';
import {
  color,
  space,
  border,
  typography
} from 'styled-system';

const StyledButton = styled.button`
  text-decoration: none;
  line-height: 1.5rem;
  display: inline-flex;
  cursor: pointer;
  border: none;
  color: ${props => props.plain ? props.theme.colors.text : props.theme.colors.lightText}
  border: 1px solid ${props => props.plain ? props.theme.colors.border : 'none'}
  background: ${props => props.plain ? props.theme.colors.light : props.theme.colors.primary}
  &:last-child {
    margin-right: 0px;
  }
  ${space}
  ${color}
  ${border}
  ${typography}
`;

export default (props) => {
  return (
    <StyledButton
        px={['sm','md']}
        py="sm"
        borderRadius='md'
        fontSize={['sm','md']}
        {...props}
    >
      {props.children}
    </StyledButton>
  )
}
