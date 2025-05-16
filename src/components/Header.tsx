import { useRef } from 'react';
import classNames from 'classnames';
import { useTodoContext } from '../context/TodoContext';

export const Header: React.FC = () => {
  const { addTodo, todos, toggle } = useTodoContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = inputRef.current;

    if (input) {
      addTodo(input.value);
      input.value = '';
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={toggle}
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
