import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { TodosFilter } from './TodosFilter';
import { ActionType } from '../utils/enums';

export const Footer = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const completedTodos = todos.filter(todo => todo.completed);

  function handlerClearCompleted() {
    dispatch({ type: ActionType.ClearCompleted });
  }

  const itemsInList = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsInList} items left`}
      </span>

      <TodosFilter />
      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={handlerClearCompleted}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
