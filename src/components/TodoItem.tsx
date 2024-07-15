import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';
import { TodoContext } from './TodoContext';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [todoStatus, setTodoStatus] = useState(todo.completed);

  const [isEditing, setIsEditing] = useState(false);

  const { setTodos } = useContext(TodoContext);

  const handleDeleteTodo = (todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.filter(currentTodo => currentTodo.id !== todoId),
    );

    if (isEditing) {
      setIsEditing(false);
    }
  };

  const handleDbClick = () => {
    setIsEditing(true);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEditing(false);
    }
  };

  const handleChangeTodo = (todoId: number, newTodoProp: keyof Todo) => {
    const updatedTodo: Todo = {
      id: todoId,
      title: newTitle?.trim() || todo.title,
      completed: newTodoProp === 'completed' ? !todoStatus : todoStatus,
    };

    setTodos(prevTodos =>
      prevTodos.map(prevTodo =>
        prevTodo.id === updatedTodo.id
          ? { ...prevTodo, ...updatedTodo }
          : prevTodo,
      ),
    );

    if (newTodoProp === 'completed') {
      setTodoStatus(!todoStatus);
    } else if (newTodoProp === 'title' && newTitle) {
      setNewTitle(newTitle.trim());
    }

    if (isEditing) {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    const trimNewTitle = newTitle.trim();

    if (!trimNewTitle) {
      handleDeleteTodo(todo.id);

      return;
    }

    handleChangeTodo(todo.id, 'title');
  };

  const handleSubmitNewTitle = (e: React.FormEvent) => {
    e.preventDefault();

    const trimNewTitle = newTitle.trim();

    if (!trimNewTitle) {
      handleDeleteTodo(todo.id);

      return;
    }

    if (trimNewTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    handleChangeTodo(todo.id, 'title');
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleChangeTodo(todo.id, 'completed')}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmitNewTitle}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onChange={handleEdit}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDbClick}
          >
            {newTitle.trim()}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
