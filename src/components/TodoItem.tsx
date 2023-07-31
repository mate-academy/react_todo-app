import { Input } from './styled-components/Input';
import {
  StyledTodoItem,
  ToggleTodo,
  TodoLabel,
  DeleteButton,
} from './styled-components/StyledTodoItem';

export const TodoItem = () => {
  return (
    <StyledTodoItem edited={false}>
      <div className="view">
        <ToggleTodo type="checkbox" id="toggle-view" />
        <TodoLabel htmlFor="toggle-view">asdfghj</TodoLabel>
        <DeleteButton type="button" data-cy="deleteTodo" />
      </div>
      <Input type="text" />
    </StyledTodoItem>
  );
};
