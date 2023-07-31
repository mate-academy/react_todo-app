import { styled } from 'styled-components';
import { TodoItem } from './TodoItem';

const StyledTodoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TodoList = () => {
  return (
    <StyledTodoList data-cy="todoList">
      <TodoItem />
    </StyledTodoList>
  );
};
