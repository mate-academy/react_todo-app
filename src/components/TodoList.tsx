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

  const handleBlur = (id: number, newTitle: string) => {
    updateTodo(id, newTitle);
    inputRef?.current?.focus();
    setEditingTodoId(null);
  };

  const handleFormSubmit = (id: number, newTitle: string) => {
    updateTodo(id, newTitle);
    setEditingTodoId(null);
    inputRef?.current?.focus();
  };

  const handleRemoveButton = (id: number) => {
    deleteTodo(id);
    inputRef?.current?.focus();
  };

  const handleTitleDblClick = (id: number, title: string) => {
    setEditingTodoId(id);
    setQuery(title);
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
                onDoubleClick={() => handleTitleDblClick(todo.id, todo.title)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleRemoveButton(todo.id)}
              >
                ×
              </button>
            </>
          ) : (
            <form
              onSubmit={event => {
                event.preventDefault();
                handleFormSubmit(todo.id, query.trim());
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={query}
                onChange={event => setQuery(event.target.value)}
                onBlur={() => handleBlur(todo.id, query.trim())}
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
