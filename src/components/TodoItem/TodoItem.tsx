/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { Todo } from '../../types';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(todo.title);
  const { updateTodo, deleteTodo } = useContext(TodosContext);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const toggleTodo = () => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const saveTodo = () => {
    const trimmedValue = editInputValue.trim();

    if (trimmedValue === todo.title) {
      setEditInputValue(trimmedValue);

      return;
    }

    if (trimmedValue === '') {
      deleteTodo(todo);

      return;
    }

    updateTodo({ ...todo, title: trimmedValue });
    setEditInputValue(trimmedValue);
  };

  const handleEditInputKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      saveTodo();
      setIsEditing(false);
    }

    if (event.key === 'Escape') {
      setEditInputValue(todo.title);
      setIsEditing(false);
    }
  };

  const handleEditInputBlur = () => {
    saveTodo();
    setIsEditing(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={toggleTodo}
        />

        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo)}
        />
      </div>

      <input
        ref={editInputRef}
        type="text"
        className="edit"
        value={editInputValue}
        onChange={(e) => setEditInputValue(e.target.value)}
        onBlur={handleEditInputBlur}
        onKeyUp={handleEditInputKeyUp}
      />
    </li>
  );
};
