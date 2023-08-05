import { useContext } from 'react';

import { TodoContext } from './context/TodoContext';

import { TodoList, TodoHeader, TodoFooter } from './components';

export const App: React.FC = () => {
  const {
    todos,
    changeTodosStatus,
    isTodosCompleted,
  } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <TodoHeader />

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isTodosCompleted}
              onChange={changeTodosStatus}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList />
          </section>

          <TodoFooter />
        </>
      )}
    </div>
  );
};
