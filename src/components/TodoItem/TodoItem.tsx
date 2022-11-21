/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  toggleTodo: (todoId: number, completed: boolean) => void;
  removeTodo: (todoId: number) => void;
  changeTodoTitle: (todoId: number, title: string) => void;
}

export const TodoItem: FC<Props> = ({
  todo,
  toggleTodo,
  removeTodo,
  changeTodoTitle,
}) => {
  const { id, title, completed } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isCompleted, setIscomleted] = useState(completed);

  const changeStatus = () => {
    setIscomleted(!isCompleted);
    toggleTodo(todo.id, !completed);
  };

  const remove = () => {
    removeTodo(todo.id);
  };

  const saveChanges = () => {
    if (!newTitle.trim()) {
      remove();
    } else {
      changeTodoTitle(todo.id, newTitle);
    }
  };

  useEffect(() => setIscomleted(completed), [todo]);

  return (
    <li className={classNames(
      { completed: isCompleted && !isEditing },
      { editing: isEditing },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${id}`}
          checked={isCompleted}
          onChange={changeStatus}
        />
        <label
          onDoubleClick={() => {
            setIsEditing(true);
          }}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={remove}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            saveChanges();
            setIsEditing(false);

            return;
          }

          if (e.key === 'Escape') {
            setNewTitle(title);
            setIsEditing(false);
            changeStatus();
          }
        }}
        onBlur={() => {
          setIsEditing(false);
          saveChanges();
        }}
      />
    </li>
  );
};
