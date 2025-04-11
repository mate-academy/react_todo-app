import { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../../store';
import { Filter } from '../../enum/Filter';
import classNames from 'classnames';
import { filterTodo } from '../../services';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [select, setSelect] = useState(Filter.All);

  const completedTodos = filterTodo(todos, Filter.Completed);

  const handleDeleteTodos = () => {
    dispatch({
      type: 'deleteMany',
      payload: completedTodos.map(todo => todo.id),
    });
  };

  const handleClick = (filter: Filter) => {
    setSelect(filter);
    dispatch({
      type: 'filter',
      payload: filter,
    });
  };

  const notCompletedTodo = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedTodo.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterName => (
          <a
            key={filterName}
            href="#/"
            className={classNames('filter__link', {
              selected: select === filterName,
            })}
            data-cy={classNames('FilterLink' + filterName)}
            onClick={() => handleClick(filterName)}
          >
            {filterName}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={handleDeleteTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
