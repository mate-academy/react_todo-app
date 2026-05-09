import { ChangeEvent, FormEvent, RefObject, useContext, useState } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import classNames from 'classnames';

type Props = {
  focusRef: RefObject<HTMLInputElement>;
};

export const Header = ({ focusRef }: Props) => {
  const { todos, toggleAll, areAllTodosCompleted, saveTodo } =
    useContext(TodosContext);
  const [title, setTitle] = useState('');

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      return;
    }

    setTitle('');
    saveTodo(trimmedTitle);
    focusRef?.current?.focus();
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted(),
          })}
          onClick={toggleAll}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          ref={focusRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
};
