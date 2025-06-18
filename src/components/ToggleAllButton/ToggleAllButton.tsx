import cn from 'classnames';
import { useTodoContext } from '../../hooks/useTodos';

export const ToggleAllButton = () => {
  const { state, toggleAll } = useTodoContext();

  const allCompleted =
    state.todos.length > 0 && state.todos.every(todo => todo.completed);

  return (
    <button
      type="button"
      className={cn('todoapp__toggle-all', { active: allCompleted })}
      data-cy="ToggleAllButton"
      onClick={toggleAll}
    />
  );
};
