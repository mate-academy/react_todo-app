/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

import './TodoItem.scss';

type Props = {
  todo: Todo,
  onChange: (value: boolean, todoId: number) => void,
  onDelete: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  // const ref = useRef<HTMLInputElement>(null);

  // const handleClick = () => {
  //   ref.current?.focus();
  // };

  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        setTodoTitle(todo.title);
        setIsEditing(false);
        break;

      case 'Enter':
        if (todoTitle !== '') {
          setTodoTitle(todoTitle);
          setIsEditing(false);
        }

        break;

      default:
        break;
    }
  };

  return (
    <li
      className={classNames({
        'completed ': todo.completed,
        'editing ': isEditing,
      })}
      onDoubleClick={() => {
        setIsEditing(!isEditing);
      }}
      onBlur={() => {
        setIsEditing(false);
        setTodoTitle(todoTitle);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => onChange(!todo.completed, todo.id)}
        />

        <label>{todoTitle}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onDelete(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit todo-input"
        value={todoTitle}
        ref={ref => ref?.focus()}
        onChange={(event) => {
          setTodoTitle(event.target.value);
        }}
        onKeyDown={handleChange}
      />
    </li>
  );
};
