/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { useState } from 'react';
import { Todo } from '../../services/types';

interface Props {
  todo: Todo,
  hanldeTodoChange: (newTodo: Todo) => void,
  hanldeOnDelete: (todoId: number) => void,
}

export const TodoItem: React.FC<Props> = ({
  todo,
  hanldeTodoChange,
  hanldeOnDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleQuery, setTitleQuery] = useState(todo.title);

  const handleOnToggle = (isChecked: boolean) => {
    const newTodo: Todo = {
      ...todo,
      completed: isChecked,
    };

    hanldeTodoChange(newTodo);
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setTitleQuery(event.currentTarget.value);

    if (event.key === 'Enter') {
      const newTodo: Todo = {
        ...todo,
        title: titleQuery,
      };

      hanldeTodoChange(newTodo);
      setIsEditing(false);
    }

    if (event.key === 'Escape') {
      setTitleQuery(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={cn({
        view: !todo.completed && !isEditing,
        completed: todo.completed && !isEditing,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={(event) => handleOnToggle(event.currentTarget.checked)}
        />
        <label
          onClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => hanldeOnDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={todo.title}
        onKeyUp={(event) => handleOnKeyUp(event)}
      />
    </li>
  );
};
