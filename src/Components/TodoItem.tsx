/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  toggleTodoStatus: (id: number) => void,
  onDeleteTodo: (id: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  toggleTodoStatus,
  onDeleteTodo,
}) => {
  return (
    <li className={classNames({ completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleTodoStatus(todo.id)}
        />
        <label htmlFor={`toggle-view-${todo.id}`}>{todo.title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDeleteTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
