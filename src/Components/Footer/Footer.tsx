import React, { useContext } from 'react';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { DispatchContext, StateContext } from '../../Context/TodoContext';
import { ReducerType } from '../../Types/ReducerType';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const todosLeft = todos.filter((todo) => !todo.completed).length;

  const handleClearCompleted = () => {
    dispatch({
      type: ReducerType.ClearCompletedTodos,
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <TodosFilter />

      <button
        type="button"
        className="clear-completed"
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
