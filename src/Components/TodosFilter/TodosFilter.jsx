import React from 'react'

export function TodosFilter({ selectFilterType, todos, removeCompleted, filterBy }) {
  const filteredTodosLength = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {filteredTodosLength > 0 ? `${filteredTodosLength} items left` : `nothing to do`}
      </span>

      <ul className="filters">
        <li onClick={() => selectFilterType('all')}>
          <a
            href="#/"
            className={filterBy === 'all' ? 'selected' : ''}
          >
            All
          </a>
        </li>

        <li onClick={() => selectFilterType('uncompleted')}>
          <a
            href="#/active"
            className={filterBy === 'uncompleted' ? 'selected' : ''}
          >
            Active
          </a>
        </li>

        <li onClick={() => selectFilterType('completed')}>
          <a
            href="#/completed"
            className={filterBy === 'completed' ? 'selected' : ''}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.some(todo => todo.completed) && <button
      onClick={() => removeCompleted(todos.filter(todo => !todo.completed))}
        type="button"
        className="clear-completed"
      >
        Clear completed
      </button>}
    </footer>
  )
}

