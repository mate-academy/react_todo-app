// /* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useContext, useState } from 'react';
import { DispatchContext } from '../TodoContext';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [todoItem, setTodoItem] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem(e.target.value);
  };

  return (
    <li
      className={cn(
        'toggle-view',
        { completed: todo.completed },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${todo.id}`}
          checked={todo.completed}
          onChange={() => {
            dispatch({ type: 'Completed', payload: todo.id });
          }}
        />
        {isEditing
          ? (
            <input
              value={todoItem}
              type="text"
              className="edit"
              onChange={handleInputChange}
            />
          )
          : (
            <label
              htmlFor={`${todo.id}`}
            >
              {todo.title}
            </label>
          )}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => dispatch({ type: 'Delete', payload: todo.id })}
        />
      </div>
    </li>
  );
};
