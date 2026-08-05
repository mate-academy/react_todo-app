import './TodoHeader.scss';

export const TodoHeader = () => {
  return (
    <header className="todo-header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todo-header__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todo-header__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
