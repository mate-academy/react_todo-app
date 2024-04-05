import React, { useContext } from 'react';
import { FilterTodos } from '../FilterTodos/FilterTodos';
import { DispatchContext, StateContext } from '../../Store';
import { Todo } from '../../type';

export const Footer: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const isActiveTodos = todos.filter((todo: Todo) => !todo.completed);
  const isDisableCompleted = todos.some((todo: Todo) => todo.completed);

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {isActiveTodos.length} items left
          </span>

          <FilterTodos />
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={() => dispatch({ type: 'removeAll' })}
            disabled={!isDisableCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
