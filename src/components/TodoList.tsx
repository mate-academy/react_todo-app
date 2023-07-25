import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
  removeTodoFromServer: (id: number) => void,
  updateStatusTodoOnServer: (id: number, status: boolean) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  removeTodoFromServer,
  updateStatusTodoOnServer,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={classNames({ completed: todo.completed })}
        >
          <TodoItem
            todo={todo}
            removeTodoFromServer={removeTodoFromServer}
            updateStatusTodoOnServer={updateStatusTodoOnServer}
          />
        </li>
      ))}
    </ul>
  );
};
