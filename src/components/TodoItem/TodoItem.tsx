import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contextes/TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);

  const {
    id,
    title,
    completed,
  } = todo;

  const [editedTitle, setEditedTitle] = useState(title);

  const onSubmitChanges = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!editedTitle) {
      setTodos(todos
        .filter(currentTodo => currentTodo.id !== id));
    }

    if (editedTitle) {
      setEditing(false);
      setTodos(todos
        .map(currentTodo => (currentTodo.id === id
          ? ({ ...currentTodo, title: editedTitle })
          : currentTodo)));
    }
  };

  const cancelChanges = () => {
    setEditing(false);
    setEditedTitle(title);
  };

  const handlerInputOnChange = () => setTodos(todos
    .map(currentTodo => (currentTodo.id === id
      ? ({ ...currentTodo, completed: !completed })
      : currentTodo)));

  const handlerOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmitChanges(event);
    } else if (event.key === 'Escape') {
      cancelChanges();
    }
  };

  const hendlerOnClick = () => setTodos(todos
    .filter(currentTodo => currentTodo.id !== id));

  return (
    <li
      className={classNames({
        completed,
        editing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handlerInputOnChange}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {title}
        </label>
        <button
          onClick={hendlerOnClick}
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        onKeyUp={handlerOnKeyUp}
        value={editedTitle}
        onChange={(event) => setEditedTitle(event.target.value)}
        type="text"
        className="edit"
      />
    </li>
  );
};
