import { useRef } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  addTodo: (event: React.FormEvent, value: string) => void;
  todos: Todo[];
  toggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Header: React.FC<Props> = ({ addTodo, todos, toggle }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    {
      const input = inputRef.current;

      if (input) {
        addTodo(event, input.value);
        input.value = '';
      }
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
