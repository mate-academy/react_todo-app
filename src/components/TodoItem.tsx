import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo, TodosContext } from '../TodosContext';
/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  todo: Todo,
};

export enum Key {
  Enter = 'Enter',
  Escape = 'Escape',
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { newTodos, setNewTodos, setMyNewTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTodoToggle = useCallback((todoId: number) => {
    const updatedTodos = newTodos.map((t) => {
      if (t.id === todoId) {
        return { ...t, completed: !t.completed };
      }

      return t;
    });

    setNewTodos(updatedTodos);
    setMyNewTodos(updatedTodos);
  }, [newTodos, setNewTodos, setMyNewTodos]);

  const handleDelete = useCallback((todoId: number) => {
    setNewTodos(newTodos.filter(t => t.id !== todoId));
    setMyNewTodos(newTodos.filter(t => t.id !== todoId));
  }, [newTodos, setNewTodos, setMyNewTodos]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (todoId: number) => {
    if (editedTitle.trim() === '') {
      handleDelete(todoId);

      return;
    }

    const updatedTodos = newTodos.map((t) => {
      if (t.id === todoId) {
        return { ...t, title: editedTitle };
      }

      return t;
    });

    setIsEditing(false);
    setNewTodos(updatedTodos);
    setMyNewTodos(updatedTodos);
  };

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>, todoId: number,
  ) => {
    if (event.key === Key.Enter) {
      handleBlur(todoId);
    } else if (event.key === Key.Escape) {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li className={cn({ completed: todo.completed, editing: isEditing })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleTodoToggle(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        readOnly={!isEditing}
        value={editedTitle}
        ref={inputRef}
        onChange={(event) => {
          setEditedTitle(event.target.value);
        }}
        onKeyUp={(event) => handleKeyUp(event, todo.id)}
        onBlur={() => handleBlur(todo.id)}
      />
    </li>
  );
};
