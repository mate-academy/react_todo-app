/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { TodosContext } from '../hooks/TodosContext';
import { useLocalStorage } from '../hooks/LocalStorage';

type TodoInfoProps = {
  todo: Todo
};

const NO_EDITED_ID = -1;
const DOUBLE_CLICK_CODE = 2;

export const TodoItem = ({ todo: { id, title, completed } }: TodoInfoProps) => {
  const [editedId, setEditedId] = useState(NO_EDITED_ID);
  const [editedTitle, setEdtedTitle] = useState(title);
  const { todos, setNewTodos } = useContext(TodosContext);
  const [, setStorageTodos] = useLocalStorage();
  const editedTitleInput = useRef<HTMLInputElement>(null);

  const itemClass = classNames({ completed }, {
    editing: id === editedId,
  });

  const handleLabelChange = () => {
    const newTodos = todos.map(todo => {
      const todoCopy = { ...todo };

      if (todo.id === id) {
        todoCopy.completed = !todo.completed;
      }

      return todoCopy;
    });

    setNewTodos(newTodos);
    setStorageTodos(newTodos);
  };

  const handleClick = () => {
    const newTodos = todos.filter(todo => todo.id !== id);

    setNewTodos(newTodos);
    setStorageTodos(newTodos);
  };

  const handleDoubleClick = (event: React.MouseEvent) => {
    if (event.detail === DOUBLE_CLICK_CODE) {
      setEditedId(id);
    }
  };

  const handleBlur = () => {
    const trimmedEditedTitle = editedTitle.trim();

    if (trimmedEditedTitle) {
      const newTodos = todos.map(todo => {
        const todoCopy = { ...todo };

        if (todo.id === editedId) {
          todoCopy.title = trimmedEditedTitle;
          setEdtedTitle(trimmedEditedTitle);
        }

        return todoCopy;
      });

      setNewTodos(newTodos);
      setStorageTodos(newTodos);
    } else {
      handleClick();
    }

    setEditedId(NO_EDITED_ID);
  };

  const handleKeyClick = (event: KeyboardEvent) => {
    if (editedId !== NO_EDITED_ID) {
      const clickedKey = event.key;

      if (clickedKey === 'Escape') {
        setEditedId(NO_EDITED_ID);
        setEdtedTitle(title);
      } else if (clickedKey === 'Enter') {
        handleBlur();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyClick);

    return () => {
      document.removeEventListener('keyup', handleKeyClick);
    };
  });

  useEffect(() => {
    editedTitleInput.current?.focus();
  }, [editedId]);

  return (
    <li className={itemClass}>
      <div
        className="view"
        onKeyDown={() => { }}
        onClick={handleDoubleClick}
        role="row"
        tabIndex={0}
      >
        <input
          type="checkbox"
          className="toggle"
          onChange={handleLabelChange}
          checked={completed}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={event => setEdtedTitle(event.target.value)}
        ref={editedTitleInput}
        onBlur={handleBlur}
      />
    </li>
  );
};
