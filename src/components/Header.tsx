import { FC } from 'react';
import cn from 'classnames';
import { useTodoContext } from '../context/TodoContext';

export const Header: FC = () => {
  const {
    noTodos,
    newTodoInput,
    todoTitle,
    setTodoTitle,
    handleSubmit,
    allCompleted,
    handleToggleAll,
  } = useTodoContext();

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {!noTodos && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allCompleted })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form method="POST" onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={newTodoInput}
          name={'title'}
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
