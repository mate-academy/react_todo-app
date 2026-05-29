import { useTodos } from '../Context/TodoContext';
import { HeaderForm } from './HeaderForm';

export const Header = () => {
  const { state, dispatch } = useTodos();
  const hasTodos = state.todos.length > 0;
  const allCompleted = state.todos.every(todo => todo.completed);
  const isActive = hasTodos && allCompleted;

  return (
    <header className="todoapp__header">
      {state.todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${isActive ? ' active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      <HeaderForm />
    </header>
  );
};
