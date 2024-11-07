/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import './TodoItem.scss';
import { Todo } from '../../../types/todo';
import { useTodo } from '../../../services/TodoHooks';
import { TodosContext } from '../../../services/TodosContext&Provider';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [isEscaped, setIsEscaped] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selectedTodo]);

  const { todos } = useContext(TodosContext);
  const { removeTodo, toggleTodo, renameTodo } = useTodo();

  function handleSelectTodo(ev: React.MouseEvent<HTMLSpanElement>) {
    const selectedTodoTitle = ev.currentTarget.textContent;

    setQuery(selectedTodoTitle?.trim());

    setSelectedTodo(todos.find(t => t.title === selectedTodoTitle));
  }

  function handleSubmitForm(id: number, newTitle: string) {
    if (isEscaped) {
      setIsEscaped(false);

      return;
    }

    if (!newTitle.trim()) {
      removeTodo(id);
    }

    renameTodo(id, newTitle);

    setSelectedTodo(null);
  }

  function handleEscape(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      setIsEscaped(true);
      setSelectedTodo(null);
      inputRef.current?.blur();
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('keyup', handleEscape);
    }
  }, [selectedTodo]);

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </label>

      {selectedTodo === todo ? (
        <form
          onSubmit={ev => {
            ev.preventDefault();
            handleSubmitForm(todo.id, query);
          }}
          onBlur={() => handleSubmitForm(todo.id, query)}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={ev => setQuery(ev.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleSelectTodo}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => removeTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
