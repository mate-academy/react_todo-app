import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../TodosContext';
import { ReducerType } from '../../types/enums/ReducerType';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const hasCompletedTodos = todos.some(todo => todo.completed);
  const notCompletedTodosLength = todos.filter(todo => !todo.completed).length;

  const handleClearCompleted = () => {
    dispatch({
      type: ReducerType.ClearCompletedTodos,
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodosLength} items left`}
      </span>

      <TodosFilter />

      {
        hasCompletedTodos && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
