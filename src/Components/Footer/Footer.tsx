import classNames from 'classnames';
import { useContext } from 'react';
import { TodoListContext } from '../../Context/TodoListContext';
import { EditContext } from '../../Context/EditContext';
import { Action } from '../../Enum/Action';
import { FilterContext } from '../../Context/FilterContext';
import { Filters, filtersButtons } from '../../Enum/Filters';

export const Footer = () => {
  const { setEditedTodoList } = useContext(EditContext);
  const { todoList } = useContext(TodoListContext);
  const { setFilter, filter } = useContext(FilterContext);

  const todoLeft: number = todoList.reduce(
    (sum, todo) => (!todo.completed ? sum + 1 : sum),
    0,
  );

  const handleFilter = (filterItem: Filters) => {
    setFilter(filterItem);
  };

  const handleDeleteCompleted = (actionType: keyof typeof Action) => {
    setEditedTodoList({
      actionType,
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todoLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filtersButtons.map(filterItem => (
          <a
            key={filterItem}
            href={
              filterItem !== 'All'
                ? `#/${filterItem[0].toLowerCase() + filterItem.slice(1)}`
                : '#/'
            }
            className={classNames('filter__link', {
              selected: filter === filterItem,
            })}
            data-cy={`FilterLink${filterItem}`}
            onClick={() => handleFilter(filterItem)}
          >
            {filterItem}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todoList.some(todo => todo.completed) ? false : true}
        onClick={() => handleDeleteCompleted('deleteCompleted')}
      >
        Clear completed
      </button>
    </footer>
  );
};
