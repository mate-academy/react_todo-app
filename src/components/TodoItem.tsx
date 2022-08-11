/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  onDelete: (todoId: number) => void,
  onEdit: (todoId: number, todoTitle: string) => void,
  onChangeStatus: (todoId: number, todoStatus: boolean) => void,
};

export const TodoItem: FC<Props> = ({
  todo,
  onDelete,
  onEdit,
  onChangeStatus,
}) => {
  const [changes, setChanges] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  return (
    <li className={classNames({
      completed: todo.completed,
      view: !todo.completed,
      editing: changes,
    })}
    >
      {!changes ? (
        <div className="view">
          <input
            checked={todo.completed}
            onChange={() => onChangeStatus(todo.id, todo.completed)}
            type="checkbox"
            className="toggle"
          />

          <label
            onDoubleClick={() => !todo.completed && setChanges(true)}
          >
            {todo.title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => onDelete(todo.id)}
          />
        </div>
      ) : (
        <form onSubmit={(event) => {
          event.preventDefault();
          if (todoTitle.trim().length === 0) {
            onDelete(todo.id);

            return;
          }

          onEdit(todo.id, todoTitle);
          setChanges(false);
        }}
        >
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={changes}
            type="text"
            className="edit"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
            onBlur={() => setChanges(false)}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setChanges(false);
                setTodoTitle(todo.title);
              }
            }}
          />
        </form>
      )}
    </li>
  );
};
