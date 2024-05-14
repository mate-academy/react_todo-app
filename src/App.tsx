import React, { useContext } from 'react';
import ToDoApp from './components/ToDoApp/ToDoApp';
import ToDoList from './components/ToDoList/ToDoList';
import { ToDoContext } from './context/ToDoProvider';
import ToDosFilter from './components/ToDosFilter/ToDosFilter';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const { todos, locationPage, dispatch } = useContext(ToDoContext);

  const filterNavigation = todos.filter(
    todo =>
      locationPage === Status.all ||
      (locationPage === Status.active && !todo.completed) ||
      (locationPage === Status.completed && todo.completed),
  );

  const { visibleClearButton, itemLeft } = todos.reduce(
    (acc, todo) => {
      if (!todo.completed) {
        acc.itemLeft++;
      }

      if (todo.completed) {
        acc.visibleClearButton = true;
      }

      return acc;
    },
    { visibleClearButton: false, itemLeft: 0 },
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <ToDoApp />
      </header>
      {todos.length !== 0 && (
        <>
          <section className="main">
            <ToDoList todos={filterNavigation} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {itemLeft > 0
                ? `${itemLeft} ${itemLeft === 1 ? 'item' : 'items'} left`
                : ''}
            </span>
            <ToDosFilter />
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
