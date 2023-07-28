import { useContext, useCallback } from 'react';
import { DispatchContext, TodosContext } from '../../store';
import { TodoList } from '../TodoList/TodoList';

export const Main = () => {
  const dispatch = useContext(DispatchContext);
  const todos = useContext(TodosContext);

  const isAllChecked = todos.every(todo => todo.completed);

  const checkboxHandler = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => dispatch({
    type: 'change-all',
    completeness: event.target.checked,
  }), []);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={checkboxHandler}
        checked={isAllChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
