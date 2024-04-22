import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../context/ToDoContext';
import { ToDoEnum } from '../../types/ToDo';

export const Footer: React.FC = () => {
  const { todos, filterType } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const filterTypes = Object.values(ToDoEnum);
  const disabledCondition = todos.every(plan => !plan.completed);

  const handleItems = () => {
    return todos.filter(plan => !plan.completed).length;
  };

  const handleFilter = (filter: ToDoEnum) => {
    dispatch({ type: 'changeFilterValue', filterType: filter});
  };

  const handleRemoveCompleted = () => {
    dispatch({ type: 'removeCompleted' });
    dispatch({ type: 'inputFocusTrue' });
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {handleItems()} items left
          </span>

          <nav className="filter" data-cy="Filter">
            {filterTypes.map(filter => (
              <a
                key={filter}
                href={`#/${filter.toLowerCase()}`}
                className={`filter__link ${
                  filter === filterType ? 'selected' : ''
                }`}
                data-cy={`FilterLink${filter}`}
                onClick={() => handleFilter(filter)}
              >
                {filter}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleRemoveCompleted}
            disabled={disabledCondition}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
