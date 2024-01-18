import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  return (
    <ul className="todo-list" data-cy="todoList">
      <TodoItem />
    </ul>
  );
};
