import { useState } from 'react';
import { KeyboardEvent } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  addTodos: (title: string) => void;
  handleBtnToggleAll: () => void;
  todos: Todo[];
};

export const TodoHeader: React.FC<Props> = ({
  addTodos,
  handleBtnToggleAll,
  todos,
}) => {
  const [title, setTitle] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const trimmedTitle = title.trim();

    if (event.key === 'Enter' && trimmedTitle) {
      event.preventDefault();
      addTodos(title);
      setTitle('');
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed === true),
          })}
          data-cy="ToggleAllButton"
          onClick={() => handleBtnToggleAll()}
        />
      )}
      {/* Add a todo on form submit */}
      <form>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};
