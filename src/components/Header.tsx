import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import { useTodosContext } from '../context';

export const Header = () => {
  const [title, setTitle] = useState('');
  const {
    addTodo,
    todos,
    isInputDisabled,
    handleToggleAll,
    isCompletedTodos,
  } = useTodosContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(title);
    setTitle('');
  };

  return (
    <header className="todoapp__header">

      {!!todos.length && (
        <button
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            { active: isCompletedTodos },
          )}
          onClick={handleToggleAll}
          aria-label="active"
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={isInputDisabled}
          value={title}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};
