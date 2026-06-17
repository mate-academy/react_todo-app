import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import '../../styles/todoapp.scss';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../Store';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const submitHandler = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmed = title.trim();

      setIsLoading(true);
      dispatch({ type: 'add', todo: { title: trimmed } });

      setTitle('');
      setIsLoading(false);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [title, dispatch],
  );

  const handleTitleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const total = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      {total > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: completedCount === total,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={submitHandler}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={title}
          ref={inputRef}
          placeholder="What needs to be done?"
          onChange={handleTitleInput}
          disabled={isLoading}
        />
      </form>
    </header>
  );
};
