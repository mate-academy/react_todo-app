import { Filter } from '../Filter/Filter';
import { useContext } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../context/TodoContextProvider';

export const Footer = () => {
  const { todos } = useContext(StateContext);
  const activeTodos = todos.reduce(
    (prev, todo) => (todo.completed ? prev : prev + 1),
    0,
  );
  const dispatch = useContext(DispatchContext);
  const noneTodosCompleted = !todos.length || todos.length === activeTodos;

  const handleCompletedTodosDeletion = () => {
    dispatch({ type: 'clearCompletedTodos' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <Filter />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleCompletedTodosDeletion()}
        disabled={noneTodosCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
