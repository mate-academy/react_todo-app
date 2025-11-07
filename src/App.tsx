import React, { useContext } from 'react';
import cn from 'classnames';
import { TodoItem } from './TodoItem';
import { TodoContext } from './contexts/TodoContext';
import { FILTER_TYPE } from './constants';


  export const App: React.FC = () => {
  const { 
    todos,
    newTodoTitle,
    setNewTodoTitle,
    filterBy,
    setFilterBy,
    activeTodosCount,
    completedTodosCount,
    areAllCompleted,
    handleNewTodoSubmit,
    toggleAll,
    clearCompleted,
    visibleTodos,
  } = useContext(TodoContext)!;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              aria-label="Toggle All"
              className={cn('todoapp__toggle-all', { active: areAllCompleted })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handleNewTodoSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                />
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${activeTodosCount} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={cn('filter__link', { selected: filterBy === FILTER_TYPE.ALL })}
                  data-cy="FilterLinkAll"
                  onClick={() => setFilterBy(FILTER_TYPE.ALL)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={cn('filter__link', { selected: filterBy === FILTER_TYPE.ACTIVE })}
                  data-cy="FilterLinkActive"
                  onClick={() => setFilterBy(FILTER_TYPE.ACTIVE)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={cn('filter__link', { selected: filterBy === FILTER_TYPE.COMPLETED })}
                  data-cy="FilterLinkCompleted"
                  onClick={() => setFilterBy(FILTER_TYPE.COMPLETED)}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                onClick={clearCompleted}
                disabled={completedTodosCount === 0}
              >
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};
