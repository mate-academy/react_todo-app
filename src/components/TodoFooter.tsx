import { useContext } from 'react';
import { LOCAL_STOR_KEY, SelectedContext, TodosContext } from '../store';
import cn from 'classnames';
import { Filter, Todo, filteredOptions } from '../types/type';

export const TodoFooter: React.FC = () => {
  const { dispatch } = useContext(TodosContext);
  const { selected, setSelected } = useContext(SelectedContext);
  const storedTodos = localStorage.getItem(LOCAL_STOR_KEY);
  const storedTodosArray: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];
  const hasCompletedTodos = storedTodosArray.some(todo => todo.completed);
  const numberOfItems = storedTodosArray.filter(todo => !todo.completed).length;

  const showAllTodos = () => {
    dispatch({ type: Filter.All.toUpperCase() });
    setSelected(Filter.All);
  };

  const activeTodos = () => {
    dispatch({ type: Filter.Active.toUpperCase() });
    setSelected(Filter.Active);
  };

  const competedTodos = () => {
    dispatch({ type: Filter.Completed.toUpperCase() });
    setSelected(Filter.Completed);
  };

  const clearCompetedTodos = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const arrOfFilteredFunc = [showAllTodos, activeTodos, competedTodos];

  if (!storedTodosArray.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${numberOfItems} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filteredOptions.map((el, index) => (
          <a
            key={el.title}
            href={el.href}
            className={cn('filter__link', { selected: selected === el.title })}
            data-cy={el['data-cy']}
            role="button"
            onClick={arrOfFilteredFunc[index]}
          >
            {el.title}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompetedTodos}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
