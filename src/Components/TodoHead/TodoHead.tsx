import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../GlobalContext';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoHead: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState('');
  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter],
  );

  const inputElem = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputElem.current) {
      inputElem.current.focus();
    }
  });

  const handleOnsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = title.trim();

    if (cleanTitle.length > 0) {
      dispatch({ type: 'addTodo', payload: cleanTitle });
      setTitle('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: filteredTodos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => {
            dispatch({ type: 'toggleAll' });
          }}
        />
      )}
      <form onSubmit={handleOnsubmit}>
        <input
          ref={inputElem}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
