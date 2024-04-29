import React, { useContext, useState } from 'react';

import { TodoListContext } from '../../context/TodoListContext';
import { Filters } from '../../types/Filters';
import { KEY_LOCALSTORAGE } from '../../constants/index';

import cn from 'classnames';

export const TodoFooter: React.FC = () => {
  const { uncompletedCount, completedCount, getFilter, clearCompletedTasks } =
    useContext(TodoListContext);
  const [currentFilter, setCurrentFilter] = useState<Filters>(Filters.All);

  const completedTasks = completedCount > 0;
  const todoCount = `${uncompletedCount} ${uncompletedCount > 1 ? 'items' : 'item'}`;

  const handlerCurrentFilter = (item: Filters) => {
    setCurrentFilter(item);
    getFilter(item);
  };

  const globalTodoList = JSON.parse(
    String(localStorage.getItem(KEY_LOCALSTORAGE)),
  );

  return (
    <>
      {!!globalTodoList?.length && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todoCount}
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            {Object.values(Filters).map((item: Filters) => (
              <a
                key={item}
                onClick={() => handlerCurrentFilter(item)}
                href={`#/${item.toLowerCase()}`}
                className={cn('filter__link', {
                  selected: currentFilter === item,
                })}
                data-cy={`FilterLink${item}`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            onClick={clearCompletedTasks}
            disabled={!completedTasks}
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
