/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { Editor } from '../hooks/General';
import { useState } from 'react';

type Props = {
  todo: Todo;
  editTodo: Editor;
  deleteTodo: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, deleteTodo, editTodo }) => {
  const { title, completed, id } = todo;

  const [editFlag, setEditFlag] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <>
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            onChange={() =>
              editTodo({ id, type: 'completed', value: !completed })
            }
            className="todo__status"
            checked={completed}
          />
        </label>
        {!editFlag ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setEditFlag(true);
                setQuery(title);
              }}
            >
              {title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={event => deleteTodo(event, id)}
            >
              ×
            </button>
          </>
        ) : (
          <form
            onSubmit={(event: React.FormEvent) => {
              event.preventDefault();
              if (query) {
                editTodo({ id, type: 'title', value: query });
              }
            }}
          >
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={query}
              onChange={event => setQuery(event.target.value)}
              onBlur={() => setEditFlag(false)}
            />
          </form>
        )}
      </div>
    </>
  );
};
