import { useDispatch, useStateValue } from '../../GlobalProvider';
import { FormEvent, useEffect, useRef } from 'react';
import { ActionTypes } from '../../types/ActionTypes';
import classNames from 'classnames';

export const Header = () => {
  const dispatch = useDispatch();
  const { todosCount, completedCount } = useStateValue();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todosCount]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value.trim();

    if (!inputValue) {
      return;
    }

    dispatch({
      type: ActionTypes.ADD_TODO,
      payload: { id: Date.now(), title: inputValue, completed: false },
    });

    inputRef.current!.value = '';
  };

  return (
    <header className="todoapp__header">
      {todosCount > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todosCount === completedCount,
          })}
          onClick={() => dispatch({ type: ActionTypes.TOGGLE_ALL })}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
