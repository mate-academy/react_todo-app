/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { Todo } from '../../types/Todos';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const { id, completed, title } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const todoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoField.current && isEditing) {
      todoField.current.focus();
    }
  }, [isEditing]);

  const handleRemoveTodo = () => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const updateTodoTitle = (str: string) => {
    const trimmedValue = str.trim();

    if (!trimmedValue) {
      handleRemoveTodo();

      return;
    }

    setTodos((prevTodos) => prevTodos.map((t) => (t.id === id
      ? { ...t, title: trimmedValue }
      : t)));

    setIsEditing(false);
  };

  const handleToggle = () => {
    const updatedTodos = todos.map(t => (
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    ));

    setTodos(updatedTodos);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTodoTitle(editedTitle);
    } else if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  const handleOnBlur = () => {
    updateTodoTitle(editedTitle);
  };

  return (
    <li className={cn({
      completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${id}`}
          checked={completed}
          onChange={handleToggle}
        />

        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete the todo"
          onClick={handleRemoveTodo}
        />
      </div>

      {isEditing && (
        <input
          ref={todoField}
          type="text"
          className="edit"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={handleOnBlur}
        />
      )}
    </li>
  );
};
