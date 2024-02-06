import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoFilter } from './TodoFilter';
import { Filter } from '../types/Filter';

interface Props {
  filter: Filter,
  setFilter: (filter : Filter) => void
}

const FooterTodo: React.FC<Props> = ({ filter, setFilter }) => {
  const {
    todoCount,
    completedTodos,
    deleteCompletedTodos,
  } = useContext(TodosContext);

  const handleClearCompleted = () => {
    deleteCompletedTodos();
  };

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {todoCount === 1
          ? `${todoCount} item left`
          : `${todoCount} items left`}
      </span>

      <TodoFilter
        filter={filter}
        setFilter={setFilter}
      />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default FooterTodo;
