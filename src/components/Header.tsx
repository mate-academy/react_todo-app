import classNames from 'classnames';
import { useTodoState } from '../context/TodoContext';
import { useHeader } from '../hooks/HeaderHooks';

export const Header: React.FC = () => {
  const { activeCount, inputRef, todos } = useTodoState();
  const { query, handleToggle, handleChange, handleSubmit } = useHeader();

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeCount === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggle}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          value={query}
          onChange={handleChange}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};
