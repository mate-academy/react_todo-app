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

  const isShowOnlyInput = todos.length === 0;

  return (
    <div className="todoapp">
      <TodoHeader />

      {!isShowOnlyInput
        && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onClick={handleAllCompletedToggle}
                defaultChecked={isEveryTodoCompleted()}
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
