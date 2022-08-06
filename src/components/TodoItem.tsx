/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../Types/Todo';

type Props = {
  todo: Todo,
  deleteTodo: (todoId: number) => void,
  setTodoCompleted: (todoId: number) => void,
  updateTodo: (todoId: number, title: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  setTodoCompleted,
  updateTodo,
}) => {
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState(todo.title);

  const setTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEditing(false);
      setQuery(event.target.value);
      updateTodo(todo.id, query);

      if (!event.target.value) {
        deleteTodo(todo.id);
      }
    }

    if (event.key === 'Escape') {
      setEditing(false);
      setQuery(todo.title);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!event.target.value.trim().length) {
      deleteTodo(todo.id);
    } else {
      setEditing(false);
      setQuery(event.target.value);
      updateTodo(todo.id, query);
    }
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
      onDoubleClick={() => setEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={() => setTodoCompleted(todo.id)}
          checked={todo.completed}
        />
        <label htmlFor="toggle-completed">
          {todo.title}
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(todo.id)}
          />
        </label>
      </div>
      <input
        type="text"
        className="edit"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={setTitle}
        onBlur={onBlur}
      />
    </li>
  );
};
