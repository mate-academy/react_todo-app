import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DispatchContext, TodoContext } from './TodoContext';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');
  const state = useContext(TodoContext);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (title.trim()) {
        dispatch({
          type: 'addTodo',
          payload: { title: title.trim(), completed: false },
        });

        setTitle('');
      }
    },
    [dispatch, title],
  );

  const handleToggleAll = () => {
    dispatch({ type: 'toggleAll', payload: { todo: state.todos } });
  };

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [state]);

  return (
    <header className="todoapp__header">
      <>
        {state.todos.length > 0 && (
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              active: state.todos.every(todo => todo.completed === true),
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
          />
        )}

        <form onSubmit={handleSubmit}>
          <input
            ref={inputField}
            data-cy="NewTodoField"
            type="text"
            value={title}
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </>
    </header>
  );
};
