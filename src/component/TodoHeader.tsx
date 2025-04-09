import { useContext, useRef, useEffect } from 'react';
import { TodoContex } from './Contex';
import classNames from 'classnames';

export const TodoHeader = () => {
  const { todos, isInput, setIsInput, handleSubmit, reverseCompleted } =
    useContext(TodoContex);

  const titleFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleFocus.current) {
      titleFocus.current.focus();
    }
  }, [handleSubmit]);

  const isAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={reverseCompleted}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={titleFocus}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={isInput}
          onChange={event => setIsInput(event.target.value)}
        />
      </form>
    </header>
  );
};
