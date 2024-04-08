import { useContext, useState } from 'react';
import { DispatchContext, TodosContext } from '../../store/Store';
import { TodoList } from './components/TodoList/TodoList';
import { changeTodosStatuses } from '../../utils/utils';

export const Main = () => {
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [toggleAll, setToggleAll] = useState(false);
  const displayInput = todos.length > 0;

  return (
    <section className="main">
      {displayInput && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={toggleAll}
            onChange={() => {
              setToggleAll(!toggleAll);
              changeTodosStatuses(toggleAll, todos, dispatch);
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
      <TodoList items={todos} />
    </section>
  );
};
