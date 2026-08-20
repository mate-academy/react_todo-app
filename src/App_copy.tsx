/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { NewTodo } from './components/NewTodo';
import { useGlobalState } from './context/Context';
import { TodoItem } from './components/TodoList/TodoItem';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const { todos } = useGlobalState();

  const isAllCompleted = todos.some(todo => !todo.completed);

  return (
    <div className="todoapp">
      <Header />
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', !isAllCompleted && 'active')}
              data-cy="ToggleAllButton"
            />
          )}

          <NewTodo />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              3 items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className="filter__link selected"
                data-cy="FilterLinkAll"
              >
                All
              </a>

              <a
                href="#/active"
                className="filter__link"
                data-cy="FilterLinkActive"
              >
                Active
              </a>

              <a
                href="#/completed"
                className="filter__link"
                data-cy="FilterLinkCompleted"
              >
                Completed
              </a>
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={true}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

// <section className="todoapp__main" data-cy="TodoList">
//     {/* This is a completed todo */}
//     <div data-cy="Todo" className="todo completed">
//       <label className="todo__status-label">
//         <input
//           data-cy="TodoStatus"
//           type="checkbox"
//           className="todo__status"
//           checked
//         />
//       </label>

//       <span data-cy="TodoTitle" className="todo__title">
//         Completed Todo
//       </span>

//       {/* Remove button appears only on hover */}
//       <button type="button" className="todo__remove" data-cy="TodoDelete">
//         ×
//       </button>
//     </div>

//     {/* This todo is an active todo */}
//     <div data-cy="Todo" className="todo">
//       <label className="todo__status-label">
//         <input
//           data-cy="TodoStatus"
//           type="checkbox"
//           className="todo__status"
//         />
//       </label>

//       <span data-cy="TodoTitle" className="todo__title">
//         Not Completed Todo
//       </span>

//       <button type="button" className="todo__remove" data-cy="TodoDelete">
//         ×
//       </button>
//     </div>

//     {/* This todo is being edited */}
//     <div data-cy="Todo" className="todo">
//       <label className="todo__status-label">
//         <input
//           data-cy="TodoStatus"
//           type="checkbox"
//           className="todo__status"
//         />
//       </label>

//       {/* This form is shown instead of the title and remove button */}
//       <form>
//         <input
//           data-cy="TodoTitleField"
//           type="text"
//           className="todo__title-field"
//           placeholder="Empty todo will be deleted"
//           value="Todo is being edited now"
//         />
//       </form>
//     </div>

//     {/* This todo is in loadind state */}
//     <div data-cy="Todo" className="todo">
//       <label className="todo__status-label">
//         <input
//           data-cy="TodoStatus"
//           type="checkbox"
//           className="todo__status"
//         />
//       </label>

//       <span data-cy="TodoTitle" className="todo__title">
//         Todo is being saved now
//       </span>

//       <button type="button" className="todo__remove" data-cy="TodoDelete">
//         ×
//       </button>
//     </div>
//   </section>
