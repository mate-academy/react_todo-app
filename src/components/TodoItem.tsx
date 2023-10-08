/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import cn from 'classnames';
import { Todo } from '../types/Todo';
import { useSingleAndDoubleClick } from '../utils/useSingleAndDoubleClick';
import { TodosContext } from '../context/TodosContext';

type Props = {
  item: Todo
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const {
    deleteTodo,
    handleCompletedChange,
    updateTodo,
  } = useContext(TodosContext);

  const [newTitle, setNewTitle] = useState(title);
  const [editingTodoId, setEditingTodoId] = useState(0);
  const currentTitle = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentTitle.current) {
      currentTitle.current.focus();
    }
  }, [editingTodoId]);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const singleClick = () => handleCompletedChange(id);
  const doubleClick = () => {
    setEditingTodoId(id);
  };

  const handleChangeTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditingTodoId(0);
      setNewTitle(title);
    }

    if (event.key === 'Enter') {
      if (newTitle !== title) {
        updateTodo(id, newTitle);
      }

      if (completed) {
        handleCompletedChange(id);
      }

      setEditingTodoId(0);
    }
  };

  const handleBlur = () => {
    if (newTitle !== title) {
      updateTodo(id, newTitle);
    }

    setEditingTodoId(0);
  };

  return (
    <li className={cn({
      completed,
      editing: editingTodoId === id,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => handleCompletedChange(id)}
        />

        <label
          onClick={useSingleAndDoubleClick(singleClick, doubleClick, 300)}
          aria-hidden="true"
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={changeTitle}
        onKeyUp={handleChangeTitle}
        onBlur={handleBlur}
        ref={currentTitle}
      />
    </li>
  );
};
