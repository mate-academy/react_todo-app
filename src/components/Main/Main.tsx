import { useState } from 'react';
import { useTodos, useTodosDispatch } from '../TodosContext/TodosContext';
import { State } from '../../types/State';
import { TodoList } from '../TodoList/TodoList';

export const Main: React.FC = () => {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    const completed = !toggleAll;

    dispatch({ type: State.TOGGLE_ALL, completed });
    setToggleAll(completed);
  };

  const allCompleted = todos.every((todo) => todo.completed);

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allCompleted}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <TodoList />
    </section>
  );
};
