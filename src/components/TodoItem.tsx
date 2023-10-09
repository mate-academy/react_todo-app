import React, { useContext, useState } from 'react';
import cn from 'classnames';
import { Todo, TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    todos,
    setTodos,
  }
    = useContext(TodosContext);

  const [editTitle, setEditTitle] = useState(todo.title);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  const toggleTodo = (todoId: number) => {
    const newTodos = todos.map(currentTodo => {
      return currentTodo.id === todoId
        ? { ...currentTodo, completed: !currentTodo.completed }
        : currentTodo;
    });

    setTodos(newTodos);
  };

  const deleteTodo = (todoId: number) => {
    const newTodos = todos.filter(currentTodo => currentTodo.id !== todoId);

    setTodos(newTodos);
  };

  const updateTodo = (todoId: number, newTitle: string) => {
    const newTodos = todos.map(currentTodo => {
      if (currentTodo.id === todoId) {
        return { ...currentTodo, title: newTitle };
      }

      return currentTodo;
    });

    setTodos(newTodos);
  };

  const handleDoubleClick = () => {
    setEditingTodoId(todo.id);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleEditKeyUp = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        if (editTitle.trim() === '') {
          deleteTodo(todo.id);
        } else {
          updateTodo(todo.id, editTitle);
        }

        setEditingTodoId(null);
        break;

      case 'Escape':
        setEditTitle(todo.title);
        setEditingTodoId(null);
        break;

      default:
        break;
    }
  };

  const handleEditBlur = () => {
    if (editTitle.trim() === '') {
      deleteTodo(todo.id);
    } else {
      updateTodo(todo.id, editTitle);
    }

    setEditingTodoId(null);
  };

  const isEditingThisTodo = editingTodoId === todo.id;

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEditingThisTodo,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        {isEditingThisTodo ? null : (
          <label onDoubleClick={handleDoubleClick}>
            {todo.title}
          </label>
        )}

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete Todo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      {isEditingThisTodo && (
        <input
          type="text"
          className="edit"
          value={editTitle}
          onChange={handleEditChange}
          onKeyUp={handleEditKeyUp}
          onBlur={handleEditBlur}
        />
      )}
    </li>
  );
};
