import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../context/TodosContext';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const uncompletedTasks = todos?.filter(e => !e.completed);
  const completedTasks = todos?.filter(e => e.completed);
  const removeCompletedHandler = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {uncompletedTasks?.length === 1
          ? '1 item left'
          : uncompletedTasks?.length + ' items left'}
      </span>
      <TodosFilter />
      {completedTasks?.length ? (
        <button
          onClick={removeCompletedHandler}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      ) : (
        ''
      )}
    </footer>
  );
};
