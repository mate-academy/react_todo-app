import { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import classNames from 'classnames';

export const Header: React.FC = ({}) => {
  const [title, setTitle] = useState('');

  const { dispatch, state: todos } = useContext(TodoContext);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggle' })}
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={e => {
          e.preventDefault();
          if (title.trim().length === 0) {
            return;
          }

          dispatch({ type: 'add', payload: { title: title.trim() } });
          setTitle('');
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          ref={inputRef}
          onChange={e => {
            setTitle(e.target.value);
          }}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
