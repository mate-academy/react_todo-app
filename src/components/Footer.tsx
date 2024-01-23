import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { TodosFilter } from './TodosFilter';

export const Footer = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  function handlerClearCompleted() {
    dispatch({ type: 'clearComplited' });
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <TodosFilter />

      <button
        type="button"
        className="clear-completed"
        onClick={handlerClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
