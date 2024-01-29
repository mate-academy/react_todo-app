import React, { useContext, useMemo, useState } from 'react';
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

  let className = '';

  if (isEditing) {
    className = 'editing';
  } else if (todo.completed) {
    className = 'completed';
  }

  const updateTodoItem = (item: Todos) => {
    if (item.id === todo.id) {
      return { ...item, title: completedTitle };
    }

    return item;
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setTodos((currentTodos) => currentTodos.map(updateTodoItem));
    } else if (event.key === 'Escape') {
      setCompletedTitle(todo.title);
    }

    setIsEditing(false);
  };

  return (
    <li
      className={className}
    >
      <div className="view">
        <input
          value={todo.title}
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          onKeyUp={handleKeyUp}
          onChange={() => toggleTodo(todo.id)}
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
      <input type="text" className="edit" />
    </li>
  );
};
