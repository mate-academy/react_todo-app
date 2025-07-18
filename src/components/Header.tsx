import cn from 'classnames';
import { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';

type Props = {};

export const Header: React.FC<Props> = () => {
  const { todos, hasTodos, inputRef, addTodo, toggleTodoComplete } =
    useContext(TodoContext);
  const [inputValue, setInputValue] = useState<string>('');
  const isAllTodosCompleted = todos.every(todo => todo.completed);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const value = inputValue.trim();

    event.preventDefault();
    if (value.length === 0) {
      return;
    }

    addTodo(value);
    setInputValue('');
    inputRef.current?.focus();
  }

  function toggleAllTodosComplete() {
    const newCompleted = !todos.every(todo => todo.completed);

    todos.forEach(todo => {
      if (todo.completed !== newCompleted) {
        toggleTodoComplete(todo.id);
      }
    });

    inputRef.current?.focus();
  }

  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          onClick={toggleAllTodosComplete}
          type="button"
          className={cn('todoapp__toggle-all', isAllTodosCompleted && 'active')}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          onChange={event => setInputValue(event.target.value)}
          value={inputValue}
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
