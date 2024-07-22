import { useRef } from 'react';
import { useAppContextContainer } from '../../context/AppContext';
import footerData from './TodoFooter.data';
import TodoFooterSort from './TodoFooterSort';
import { SortType } from '../../enums/SortType';

// type Props = {};

const TodoFooter = ({}) => {
  const { sortType, changeSortType, todos, inputRef, clearCompleted } =
    useAppContextContainer();
  const navRef = useRef<HTMLElement>(null);
  const completedTasks = todos.reduce(
    // eslint-disable-next-line no-param-reassign
    (a, b) => (!b.completed ? (a += 1) : a),
    0,
  );
  const isSomeCompleted = todos.some(el => el.completed);

  const handleClickClearCompleted = () => {
    clearCompleted();
    inputRef.current?.focus();
  };

  const handleClickFilterOption = (option: SortType) => {
    changeSortType(option);
  };

  return (
    !!todos.length && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {completedTasks} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter" ref={navRef}>
          {footerData.map(option => (
            <TodoFooterSort
              key={option.dataCY}
              currentType={sortType}
              sortOption={option}
              onClick={handleClickFilterOption}
            />
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClickClearCompleted}
          disabled={!isSomeCompleted}
        >
          Clear completed
        </button>
      </footer>
    )
  );
};

export default TodoFooter;
