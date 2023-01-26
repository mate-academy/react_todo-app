import React from 'react';
import { FilterBy } from '../../types/FilterBy';
import { Todo } from '../../types/Todo';
import TodosFilter from '../TodosFilter';

type Props = {
  items: Todo[],
  filterBy: FilterBy,
  setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>,
  setItems: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const Footer:React.FC<Props> = ({
  items, filterBy, setFilterBy, setItems,
}) => {
  if (!items.length) {
    return null;
  }

  const isClearCompleted = items.filter(todo => todo.completed).length > 0;
  const handleClickClearCompleted = () => {
    setItems(currentTodos => [
      ...currentTodos.filter(todo => !todo.completed),
    ]);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {items.length}
        {' '}
        items left
      </span>

      <TodosFilter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      <button
        type="button"
        className="clear-completed"
        onClick={handleClickClearCompleted}
        disabled={!isClearCompleted}
      >
        {isClearCompleted && 'Clear completed'}
      </button>
    </footer>
  );
};
