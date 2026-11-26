import cn from 'classnames';
import { useContext } from 'react';
import { TabsContext } from '../Context/TabsContext';

export default function ToggleTodos() {
  const { todos, toggleTodos } = useContext(TabsContext);

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <button
      type="button"
      className={cn('todoapp__toggle-all', {
        active: areAllCompleted,
      })}
      data-cy="ToggleAllButton"
      onClick={toggleTodos}
    />
  );
}
