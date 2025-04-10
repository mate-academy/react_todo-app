import { useTodos } from '../context/TodosContext';

export const Form: React.FC = () => {
  const {
    inputRef,
    todos,
    inputValue,
    handleChangeInput,
    handleSubmit,
    handleUncompletedAllTodos,
  } = useTodos();

  return (
    <header className="todoapp__header">
      {todos.length === 0 ? (
        ''
      ) : (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed === true) === true ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleUncompletedAllTodos}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
          value={inputValue}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
};
