import classNames from 'classnames';
import { useDispatch, useTodos } from '../store/Store';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [query, setQuery] = useState('');
  const todos = useTodos().todos;
  const dispatch = useDispatch();

  const isAllTodosCompleted = todos.every(todo => todo.completed);

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.trim().length === 0) {
      return;
    }

    dispatch({
      type: 'ADD_TODO',
      payload: {
        title: query.trim(),
      },
    });

    setQuery('');
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            dispatch({
              type: 'TOOGLE_COMPLETE_TODOS',
            });
          }}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmitForm}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => setQuery(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
}
