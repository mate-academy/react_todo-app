import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import cn from 'classnames';

export const TodoHeader = () => {
  const [query, setQuery] = useState('');
  const { dispatch, newTodoField, todos, completedTodos } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    dispatch({ type: 'addTodo', payload: trimmedQuery });
    setQuery('');
  };

  const handleToggleAll = () => {
    if (todos.length === completedTodos.length) {
      dispatch({ type: 'toggleAll' });
    } else {
      dispatch({ type: 'allCompleted' });
    }
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          onClick={handleToggleAll}
          type="button"
          className={cn(
            'todoapp__toggle-all',
            todos.length === completedTodos.length && 'active',
          )}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={e => handleSubmit(e)}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          ref={newTodoField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
