/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoContext } from './contexts/TodoContext';
import TodoItem from './components/TodoItem';

export const App: React.FC = () => {
  const todoCtx = React.useContext(TodoContext);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const unfinishedTodos = todoCtx.todos.filter(todo => !todo.completed).length;

  const completedTodos = todoCtx.todos.filter(todo => todo.completed);

  const allTodosCompleted = todoCtx.todos.every(todo => todo.completed);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todoCtx.todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todoCtx.todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allTodosCompleted && 'active'}`}
              data-cy="ToggleAllButton"
              onClick={todoCtx.handleToggleAll}
            />
          )}

          <form onSubmit={todoCtx.handleTodoSubmission}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              value={todoCtx.todoTitle}
              onChange={event => {
                todoCtx.setTodoTitle(event.target.value);
              }}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todoCtx.todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {todoCtx.filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            <footer className="todoapp__footer" data-cy="Footer">
              <span className="todo-count" data-cy="TodosCounter">
                {`${unfinishedTodos} items left`}
              </span>

              <nav className="filter" data-cy="Filter">
                <a
                  href="#/"
                  className={`filter__link ${todoCtx.filterBy === 'all' ? 'selected' : ''}`}
                  data-cy="FilterLinkAll"
                  onClick={() => todoCtx.setFilterBy('all')}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={`filter__link ${todoCtx.filterBy === 'active' ? 'selected' : ''}`}
                  data-cy="FilterLinkActive"
                  onClick={() => {
                    todoCtx.setFilterBy('active');
                  }}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={`filter__link ${todoCtx.filterBy === 'completed' ? 'selected' : ''}`}
                  data-cy="FilterLinkCompleted"
                  onClick={() => todoCtx.setFilterBy('completed')}
                >
                  Completed
                </a>
              </nav>

              <button
                type="button"
                className="todoapp__clear-completed"
                data-cy="ClearCompletedButton"
                disabled={completedTodos.length === 0}
                onClick={todoCtx.handleClearActiveTodos}
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
