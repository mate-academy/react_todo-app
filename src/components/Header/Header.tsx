import classNames from 'classnames';
import { useContext, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../TodoContext/TodoContext';

export const Header: React.FC = () => {
  const { addNewTodo, title, setTitle, todos, handleAllChangeStatus } =
    useContext(TodoContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewTodo(title);
  };

  const isAllCompleteTodos = todos.every((todo: Todo) => todo.completed);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleteTodos,
          })}
          data-cy="ToggleAllButton"
          onClick={handleAllChangeStatus}
        />
      )}
      <form onSubmit={handleTitleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
