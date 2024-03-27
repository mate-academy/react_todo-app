import { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { DispatchContext, StateContext } from '../../context/TodosContext';

export const Main = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const checkItemsHandler = todos.every(todo => todo.completed);

  const handleChangeTodos = () => {
    if (checkItemsHandler) {
      dispatch({ type: 'UNCHECK_TODOS' });
    } else {
      dispatch({ type: 'CHECK_ALL_TODOS' });
    }
  };

  return (
    <section className="main">
      {todos?.length ? (
        <>
          <input
            checked={checkItemsHandler}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleChangeTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      ) : (
        ''
      )}

      <TodoList items={todos} />
    </section>
  );
};
