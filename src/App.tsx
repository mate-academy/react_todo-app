import React, { useContext } from 'react';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import { TodoContext } from './TodoProvider';
import TodosFilter from './TodosFilter';
import { Status } from './Status/Status';

export const App: React.FC = () => {
  const { todos, locationPage, dispatch } = useContext(TodoContext);

  const filterNavigation = todos.filter(todo => {
    switch (locationPage) {
      case Status.all:
        return todo;
      case Status.active:
        return !todo.completed;
      case Status.completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  const visibleClearButton = todos.some(todo => todo.completed);
  const itemLeft = filterNavigation.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoApp />
      </header>
      {todos.length !== 0 && (
        <>
          <section className="main">
            <TodoList todos={filterNavigation} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {itemLeft.length < 1
                ? ''
                : `${itemLeft.length === 1 ? `${itemLeft.length} item left` : `${itemLeft.length} items left`}`}
            </span>
            <TodosFilter />
            {visibleClearButton && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => dispatch({ type: 'CLEAR_COMPLETED_TODOS' })}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
