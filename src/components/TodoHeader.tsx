import { useState } from 'react';
import { useTodosContext } from '../context/TodosContext';

export const TodoHeader: React.FC = () => {
  const {
    todos,
    newTodoFieldRef,
    hasAllTodosCompleted,
    handleToggleAll,
    addTodo,
  } = useTodosContext();
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (addTodo(title)) {
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${hasAllTodosCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={newTodoFieldRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
