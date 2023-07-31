import styled, { css, keyframes } from 'styled-components';
import { Input } from './Input';
import { DeleteButton } from './DeleteButton';

type TodoItemProps = {
  $status?: 'complete' | 'view';
  $edited: boolean;
};

const slideIn = keyframes`
  from {
    transform: scale(0)
  };

  to {
    transform: scale(1)
  }
`;

export const StyledTodoItem = styled.li<TodoItemProps>`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  animation-name: ${slideIn};
  animation-duration: .5s;

  &:last-child {
    border-bottom: none;
  }

  ${Input} {
    display: none;
  }

  &:hover ${DeleteButton} {
    display: block;
  }

  ${(props) => props.$status === 'complete'
    && css`
      & label {
        color: #d9d9d9;
        text-decoration: line-through;
      }
    `};

  ${(props) => props.$edited
    && css`
      border-bottom: none;
      padding: 0;

      &:last-child {
        margin-bottom: -1px;
      }

      ${Input} {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
      }

      .view {
        display: none;
      }
    `};
`;
