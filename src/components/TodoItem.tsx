import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/todo';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(todo.title);
  const editingInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingInput.current) {
      editingInput.current.focus();
    }
  }, [isEditing]);

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter(currentTodo => currentTodo.id !== id);

    setTodos(updatedTodos);
  };

  const updateTitle = (id: number, newTitle: string) => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          title: newTitle,
        };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  const submitUpdateTitle = (event: React.FormEvent) => {
    event.preventDefault();

    if (query !== todo.title) {
      updateTitle(todo.id, query);
      setIsEditing(false);
    }

    if (!query.length) {
      removeTodo(todo.id);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        updateTitle(todo.id, query);
        setIsEditing(false);
        break;

      case 'Escape':
        setQuery(todo.title);
        setIsEditing(false);
        break;

      default: break;
    }
  };

  const changeTodoStatus = (id: number) => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          completed: !todo.completed,
        };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  return (
    <li
      className={classNames({
        editing: isEditing,
        completed: todo.completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => changeTodoStatus(todo.id)}
        />
        <label onDoubleClick={() => setIsEditing(true)}>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteTodo"
          onClick={() => removeTodo(todo.id)}
        />
      </div>

      <form onSubmit={submitUpdateTitle}>
        <input
          type="text"
          value={query}
          className="edit"
          ref={editingInput}
          onBlur={submitUpdateTitle}
          onKeyUp={handleKeyUp}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
    </li>
  );
};
