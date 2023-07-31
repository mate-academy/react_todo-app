import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const FilterLink = styled(NavLink)`
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;

  &:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  &.active {
      border-color: rgba(175, 47, 47, 0.2);
    }
`;
