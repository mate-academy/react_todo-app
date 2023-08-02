import styled from 'styled-components';
import { TodoLabel } from './TodoLabel';

export const ToggleTodo = styled.input`
  text-align: center;
  width: 40px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  opacity: 0;

  & + ${TodoLabel} {
    background-image: url('/icons/unchecked.svg');
    background-repeat: no-repeat;
    background-position: center left;
  }

  &:checked + ${TodoLabel} {
    background-image: url('/icons/checked.svg');
  }
`;
