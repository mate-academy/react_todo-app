import React, { useContext } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

type Props = {
  todo: Todo;
  isSelected: boolean;
  selectedTodoNewValue: string;
  onTodoSelect: (todoId: number, title: string) => void;
  deselectTodo: () => void;
  onSelectedTodoNewValueChange: (value: string) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isSelected,
  selectedTodoNewValue,
  onTodoSelect,
  deselectTodo,
  onSelectedTodoNewValueChange,
}) => {
  const { inputRef, toggleTodoComplete, removeTodo, updateTodoTitle } =
    useContext(TodoContext);

  function handleTodoTitleChangeSubmit(event: React.FormEvent) {
    const value = selectedTodoNewValue.trim();

    event.preventDefault();
    if (value.length === 0) {
      removeTodo(todo.id);
    } else {
      updateTodoTitle(todo.id, value);
    }

    deselectTodo();
    inputRef.current?.focus();
  }

  return (
    <div data-cy="Todo" className={cn('todo', todo.completed && 'completed')}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`todo-status-${todo.id}`} className="todo__status-label">
        <input
          id={`todo-status-${todo.id}`}
          onChange={() => toggleTodoComplete(todo.id)}
          data-cy="TodoStatus"
          type="checkbox"
          className={cn('todo__status')}
          checked={todo?.completed}
        />
      </label>

      {isSelected ? (
        <form onSubmit={handleTodoTitleChangeSubmit}>
          <input
            onChange={event => onSelectedTodoNewValueChange(event.target.value)}
            onBlur={handleTodoTitleChangeSubmit}
            onKeyDown={event => {
              if (event.key === 'Escape') {
                deselectTodo();
              }
            }}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={selectedTodoNewValue}
            autoFocus={isSelected}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            onDoubleClick={() => onTodoSelect(todo.id, todo.title)}
            className="todo__title"
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(todo.id)}
            aria-label="Delete todo"
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
