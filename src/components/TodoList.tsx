import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
  removeTodo: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  removeTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            removeTodo={removeTodo}
          />
        </li>
      ))}
    </ul>
  );
};
