import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    color,
    space,
    border,
    typography
} from 'styled-system';

const styles = `
  text-decoration: none;
  display: inline-flex;
  cursor: pointer;
  &:last-child {
    margin-right: 0px;
  }
`

const StyledLink = styled(Link)`
  ${styles}
  ${space}
  ${color}
  ${border}
  ${typography}
`;

const StyledA = styled.a`
  ${styles}
  ${space}
  ${color}
  ${border}
  ${typography}
`;

export default (props) => {
  let Component = props.to ? StyledLink : StyledA;
  return (
    <Component
        color='primary'
        bg='transparent'
        px="md"
        py="md"
        fontSize='md'
        {...props}>
      {props.children}
    </Component>
  )
}
