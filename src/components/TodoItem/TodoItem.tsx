/* eslint-disable jsx-a11y/control-has-associated-label */
// /* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DispatchContext } from '../TodoContext';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);

  const test = useRef<HTMLInputElement>(null);

  useEffect(() => {
    test.current?.focus();
  }, [isEditing]);

  const editingTodo = () => {
    if (todoTitle.trim()) {
      dispatch({
        type: 'Editing',
        payload: {
          id: todo.id,
          value: todoTitle,
        },
      });
    } else {
      dispatch({ type: 'Delete', payload: todo.id });
    }

    setIsEditing(false);
  };

  const handleKeyClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        editingTodo();
        break;
      case 'Escape':
        setTodoTitle(todo.title);
        setIsEditing(false);
        break;
      default:
        break;
    }
  };

  return (
    <li
      className={cn(
        'toggle-view',
        {
          completed: todo.completed,
          editing: isEditing,
        },
      )}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing
        ? (
          <input
            value={todoTitle}
            type="text"
            className="edit"
            onChange={(e) => setTodoTitle(e.target.value)}
            onBlur={editingTodo}
            onKeyUp={handleKeyClick}
            ref={test}
          />
        )
        : (
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => {
                dispatch({ type: 'Completed', payload: todo.id });
              }}
            />
            <label
              htmlFor="toggle-view"
            >
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => dispatch({ type: 'Delete', payload: todo.id })}
            />
          </div>
        )}
    </li>
  );
};
