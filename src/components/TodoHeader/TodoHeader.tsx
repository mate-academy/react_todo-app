import { useState } from 'react';
import { KeyboardEvent } from 'react';

type Props = {
  addTodos: (title: string) => void;
};

export const TodoHeader: React.FC<Props> = ({ addTodos }) => {
  const [title, setTitle] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTodos(title);
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        onClick={() => addTodos(title)}
      />
      {/* Add a todo on form submit */}
      <form>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
