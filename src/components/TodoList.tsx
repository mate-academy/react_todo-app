import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};
