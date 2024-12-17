import cn from 'classnames';

import { useCallback, useContext, useMemo } from 'react';
import { NewTodoForm } from './NewTodoForm';
import { StateContext } from '../context/GlobalContextProvider';
import { DispatchContext } from '../context/GlobalContextProvider';

export const Header: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const toggleAllBtnShown = useMemo(() => todos.length !== 0, [todos.length]);
  const toggleAllBtnActive = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  const handleToggleAllTodos = useCallback(() => {
    const newStatus = todos.some(todo => !todo.completed);

    const updatedTodos = todos.map(todo => {
      return todo.completed === newStatus
        ? todo
        : { ...todo, completed: newStatus };
    });

    dispatch({ type: 'setTodos', payload: updatedTodos });
  }, [dispatch, todos]);

  return (
    <header className="todoapp__header">
      {toggleAllBtnShown && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: toggleAllBtnActive })}
          onClick={handleToggleAllTodos}
          data-cy="ToggleAllButton"
        />
      )}

      <NewTodoForm />
    </header>
  );
};
