import { useContext } from 'react';

import { TodoContext, TodoUpdateContext } from './context/TodoContext';

import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';

export const App: React.FC = () => {
  const { changeTodosStatus, isTodosCompleted } = useContext(TodoUpdateContext);
  const { todos } = useContext(TodoContext);

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
