/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/todo';

type Props = {
  item: Todo,
  deleteTodo: (n: number) => void,
  markAsCompleted: (v: number) => void,
  setNewTitle: (v: string, n: number) => void
};

export const TodoItem: React.FC<Props> = ({
  item, deleteTodo, markAsCompleted, setNewTitle,
}) => {
  const handleCompleted = () => {
    markAsCompleted(item.id);
  };

  const [isEditingTodo, setIsEditingTodo] = useState(false);

  return (
    <li
      key={item.id}
      className={classNames(
        'view',
        { editing: isEditingTodo },
        { completed: item.completed },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={handleCompleted}
        />
        <label
          onDoubleClick={() => setIsEditingTodo(true)}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={item.title}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setNewTitle(event.target.value, item.id);
            setIsEditingTodo(false);
          }

          if (event.key === 'Escape') {
            setIsEditingTodo(false);
          }
        }}
        onBlur={(event) => {
          setNewTitle(event.target.value, item.id);
          setIsEditingTodo(false);
        }}
      />
    </li>
  );
};
