/* eslint-disable jsx-a11y/control-has-associated-label, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import {
  useEffect,
  useRef,
  useState,
  useContext,
  memo,
} from 'react';
import classNames from 'classnames';

import { TodoUpdateContext } from '../../context/TodoContext';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = memo(
  ({
    todo,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [query, setQuery] = useState(todo.title);

    const { updateTodo, deleteTodo } = useContext(TodoUpdateContext);

    const inputRef = useRef<null | HTMLInputElement>(null);

    const handleCheckboxChange = () => {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };

      updateTodo(updatedTodo);
    };

    const handleTitleClick = (event: React.MouseEvent) => {
      if (event.detail === 2) {
        setIsEditing(true);
      }
    };

    const handleKeyboardClick = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const updatedTodo = {
          ...todo,
          title: query,
        };

        setIsEditing(false);
        updateTodo(updatedTodo);
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
      <li className={classNames({
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
            onClick={(event) => handleTitleClick(event)}
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
          onBlur={(event) => {
            setQuery(event.target.value);
            setIsEditing(false);
          }}
          ref={inputRef}
        />
      </li>
    );
  },
);
