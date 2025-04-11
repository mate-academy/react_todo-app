import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../store';
import { filterTodo } from '../../services';
import classNames from 'classnames';
import { Filter } from '../../enum/Filter';

export const Header: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const [query, setQuery] = useState('');
  const [toggleArrow, setToggleArrow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const completedTodo = filterTodo(todos, Filter.Completed);

    if (completedTodo.length === todos.length && todos.length > 0) {
      setToggleArrow(true);
    } else {
      setToggleArrow(false);
    }
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: 'add',
      payload: { id: +new Date(), title: query.trim(), completed: false },
    });
    setQuery('');
  };

  const handleChangeManyCompleted = () => {
    const updatedTodos = todos.filter(todo => todo.completed === toggleArrow);

    dispatch({
      type: 'updateMany',
      payload: updatedTodos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      })),
    });
    setToggleArrow(!toggleArrow);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames(
            'todoapp__toggle-all',
            toggleArrow ? 'active' : '',
          )}
          data-cy="ToggleAllButton"
          onClick={handleChangeManyCompleted}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
