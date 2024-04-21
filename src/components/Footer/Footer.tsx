import React, { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../context/ToDoContext';
import { ToDoEnum } from '../../types/ToDo';

export const Footer: React.FC = () => {
  const [toFilter, setToFilter] = useState(ToDoEnum.All);
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const filterTypes = Object.values(ToDoEnum);

  const handleItems = () => {
    return todos.filter(plan => !plan.completed).length;
  };

  const handleFilter = (filter: ToDoEnum) => {
    if (filter === ToDoEnum.All) {
      dispatch({ type: 'filterAll', filterType: ToDoEnum.All });
      setToFilter(ToDoEnum.All);
    }

    if (filter === ToDoEnum.Active) {
      dispatch({ type: 'filterActive', filterType: ToDoEnum.Active });
      setToFilter(ToDoEnum.Active);
    }

    if (filter === ToDoEnum.Completed) {
      dispatch({ type: 'filterCompleted', filterType: ToDoEnum.Completed });
      setToFilter(ToDoEnum.Completed);
    }
  };

  const handleRemoveCompleted = () => {
    dispatch({ type: 'removeCompleted' });
    dispatch({ type: 'inputFocusTrue' });
  };

  return (
    <>
      {todos.length !== 0 && (
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
                  filter === toFilter ? 'selected' : ''
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
            disabled={todos.every(plan => !plan.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
