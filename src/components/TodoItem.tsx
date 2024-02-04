import React, {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import classNames from 'classnames';
import { Todos } from '../types/todos';
import { TodosContext } from './TodosContext';

type TodoItemProps = {
  todo: Todos;
  toggleTodo : (id: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  const { setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [completedTitle, setCompletedTitle] = useState(todo.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const destroy = useMemo(() => {
    return (id: number) => {
      setTodos(currentTodo => currentTodo
        .filter((current) => current.id !== id));
    };
  }, [setTodos]);

  const className = classNames({
    editing: isEditing,
    completed: todo.completed,
  });

  const updateTodos = useCallback((updateTodo: Todos) => {
    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const index = newTodos.findIndex(todoInd => todoInd.id === updateTodo.id);

      newTodos.splice(index, 1, updateTodo);

      return newTodos;
    });
  }, [setTodos]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && completedTitle.length > 0) {
      updateTodos({ ...todo, title: completedTitle });
      setIsEditing(false);
    } else if (event.key === 'Escape') {
      setCompletedTitle(todo.title);
      setIsEditing(false);
    } else if (completedTitle.length === 0) {
      destroy(todo.id);
    }
  };

  const handleBlur = () => {
    updateTodos({ ...todo, title: completedTitle });
    setIsEditing(false);
  };

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={className}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          onChange={
            () => toggleTodo(todo.id)
          }
        />
        <label
          // htmlFor={`toggle-${todo.id}`}
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => destroy(todo.id)}
          aria-label="Delete todo"
        />
      </div>
      <input
        ref={titleField}
        type="text"
        className="edit"
        value={completedTitle}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        onChange={(e) => setCompletedTitle(e.target.value)}
      />
    </li>
  );
};
