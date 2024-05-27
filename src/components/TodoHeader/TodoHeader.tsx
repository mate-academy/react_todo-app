import { useContext, useEffect, useRef, useState } from 'react';
import { KeyboardEvent } from 'react';
import cn from 'classnames';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  addTodos: (title: string) => void;
  handleBtnToggleAll: () => void;
};

export const TodoHeader: React.FC<Props> = ({
  addTodos,
  handleBtnToggleAll,
}) => {
  const [title, setTitle] = useState('');
  const { todos } = useContext(TodosContext);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && todos) {
      titleField.current.focus();
    }
  }, [todos]);

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

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    addTodos(title);

    setTitle('');
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
      <form onSubmit={handleAddTodo}>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleField}
        />
      </form>
    </header>
  );
};
