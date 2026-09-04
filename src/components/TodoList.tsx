import classNames from 'classnames';
import { useTodos } from '../TodoContext';
import { useState } from 'react';

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({ inputRef }) => {
  const { todos, deleteTodo, toggleTodo, filterStatus, updateTodo } =
    useTodos();
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const visibleTodos = todos.filter(todo => {
    if (filterStatus === 'active' && todo.completed) {
      return false;
    }

    if (filterStatus === 'completed' && !todo.completed) {
      return false;
    }

    return true;
  });

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setQuery(query);
      setEditingTodoId(null);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label" aria-label="Todo status">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
          </label>

          {editingTodoId !== todo.id ? (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onDoubleClick={() => {
                  setEditingTodoId(todo.id);
                  setQuery(todo.title);
                }}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => {
                  deleteTodo(todo.id);
                  inputRef?.current?.focus();
                }}
              >
                ×
              </button>
            </>
          ) : (
            <form
              onSubmit={event => {
                event.preventDefault();
                updateTodo(todo.id, query.trim());
                setEditingTodoId(null);
                inputRef?.current?.focus();
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={query}
                onChange={event => setQuery(event.target.value)}
                onBlur={() => {
                  updateTodo(todo.id, query.trim());
                  inputRef?.current?.focus();
                  setEditingTodoId(null);
                }}
                onKeyUp={handleKeyUp}
                autoFocus
              />
            </form>
          )}
        </div>
      ))}
    </section>
  );
};
