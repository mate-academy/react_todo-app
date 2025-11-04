import React from 'react';
import { useTodos } from '../context/TodosContext';

const TodoFooter: React.FC = () => {
  const { todos, filter, setFilter, clearCompleted } = useTodos();
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <footer className="todo-footer" data-cy="Footer">
      <span className="count" data-cy="TodosCounter">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      <div className="filters" data-cy="Filter">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
          data-cy="All"
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
          data-cy="Active"
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
          data-cy="Completed"
        >
          Completed
        </button>
      </div>
      <button
        className="clear-btn"
        onClick={clearCompleted}
        disabled={completedCount === 0}
        data-cy="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

export default TodoFooter;
