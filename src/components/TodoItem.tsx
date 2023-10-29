import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../Types/Todo';
import { TodoContext } from '../TodoContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, setVisibleTodos } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTodoToggle = useCallback((todoId: number) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, completed: !t.completed };
      }

      return t;
    });

    setTodos(updatedTodos);
    setVisibleTodos(updatedTodos);
  }, [todos, setTodos, setVisibleTodos]);

  const handleDelete = useCallback((todoId: number) => {
    setTodos(todos.filter(t => t.id !== todoId));
    setVisibleTodos(todos.filter(t => t.id !== todoId));
  }, [todos, setTodos, setVisibleTodos]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (todoId: number) => {
    if (editedTitle.trim() === '') {
      handleDelete(todoId);

      return;
    }

    const updatedTodos = todos.map((t) => {
      if (t.id === todoId) {
        return { ...t, title: editedTitle };
      }

      return t;
    });

    setIsEditing(false);
    setTodos(updatedTodos);
    setVisibleTodos(updatedTodos);
  };

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>, todoId: number,
  ) => {
    if (event.key === 'Enter') {
      handleBlur(todoId);
    } else if (event.key === 'Escape') {
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
