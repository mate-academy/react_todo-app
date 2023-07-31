import styled from 'styled-components';
import { Input } from './Input';

export const NewTodoInput = styled(Input)`
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.01);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

  &::placeholder {
    font-style: italic;
    font-weight: 300;
    color: #e6e6e6;
  }
`;
