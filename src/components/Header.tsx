import { useMemo } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { TodoForm } from './TodoForm';
import { ActionType } from '../reduces/TodoReducer';

export const Header = () => {
  const { state, dispatch } = useTodoContext();

  const allTodosCompleted = useMemo(() => {
    return state.todos
      .map(todo => todo.completed)
      .reduce((curr, next) => curr && next, Boolean(state.todos.length));
  }, [state]);

  return (
    <header className="todoapp__header">
      {state.todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: ActionType.TOGGLE_ALL })}
        />
      )}

      <TodoForm />
    </header>
  );
};
