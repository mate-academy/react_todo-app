/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import {
  useEffect,
  useRef,
  useState,
  useContext,
  memo,
} from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = memo(
  ({
    todo,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [query, setQuery] = useState(todo.title);

    const { updateTodo, deleteTodo } = useContext(TodoContext);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCheckboxChange = () => {
      updateTodo(todo.id, 'completed', !todo.completed);
    };

    const handleBlur = () => {
      updateTodo(todo.id, 'title', query);
      setIsEditing(false);
    };

    const handleKeyboardClick = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setIsEditing(false);
        updateTodo(todo.id, 'title', query);
      }

      if (event.key === 'Escape') {
        setQuery(todo.title);
        setIsEditing(false);
      }
    };

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
        window.addEventListener('keyup', handleKeyboardClick);
      }

      if (!isEditing && !query) {
        deleteTodo(todo.id);
      }

      return () => {
        window.removeEventListener('keyup', handleKeyboardClick);
      };
    }, [isEditing, query]);

    return (
      <li className={cn({
        completed: todo.completed,
        editing: isEditing,
      })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
          <label
            onDoubleClick={() => setIsEditing(true)}
          >
            {query}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </li>
    );
  },
);
