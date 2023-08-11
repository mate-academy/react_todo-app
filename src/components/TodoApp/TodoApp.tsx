import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoFooter } from '../TodoFooter';
import { TodoHeader } from '../TodoHeader';
import { TodoList } from '../TodoList';

export const TodoApp: React.FC = () => {
  const {
    todos,
    handleAllCompletedToggle,
    isEveryTodoCompleted,
  } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <TodoHeader />

      {todos.length
        ? (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onChange={handleAllCompletedToggle}
                checked={isEveryTodoCompleted}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList />
            </section>

            <TodoFooter />
          </>
        ) : (
          ''
        )}
    </div>
  );
};
