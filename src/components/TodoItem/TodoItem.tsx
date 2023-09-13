import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/todoTypes';
import { TodoContext } from '../TodoContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    todos,
    preparedTodos,
    setTodos,
  } = useContext(TodoContext);

  const { title, completed, id } = todo;

  const [doubleClicked, setDoubleClicked] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleChecked = () => {
    setTodos(todos.map(item => (
      item.id === id ? { ...item, completed: !item.completed } : item
    )));
  };

  const handleDelete = () => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleDbClick = () => {
    setDoubleClicked(true);
  };

  const handleBlur = () => {
    setDoubleClicked(false);

    if (!newTitle.trim()) {
      handleDelete();

      return;
    }

    setTodos(
      preparedTodos.map(item => {
        if (item.id === id) {
          return { ...item, title: newTitle };
        }

        return item;
      }),
    );
  };

  const saveChanges = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    }

    if (event.key === 'Escape') {
      setNewTitle(title);
      setDoubleClicked(false);
    }
  };

  const editingRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingRef.current && doubleClicked) {
      editingRef.current.focus();
    }
  }, [doubleClicked]);

  return (
    <li className={classNames({ editing: doubleClicked }, { completed })}>
      {doubleClicked ? (
        <div className="editing">
          <input
            type="text"
            className="edit"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onBlur={handleBlur}
            onKeyUp={saveChanges}
            ref={editingRef}
          />
        </div>
      ) : (
        <>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`toggle-${id}`}
              checked={completed}
              onChange={handleChecked}
            />
            <label onDoubleClick={handleDbClick}>{title}</label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="deleteTodo"
              onClick={handleDelete}
            />
          </div>
          <input type="text" className="edit" />
        </>
      )}
    </li>
  );
};
