/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import './styles/todoapp.scss';
import './styles/filters.scss';
import { TodoContext } from './context/TodoContex';
import { Todos } from './components/Todos';
import classNames from 'classnames';

export const App: React.FC = () => {
  const {
    todoList,
    inputRef,
    addTodo,
    removeCompletedTodos,
    toggleAll,
    filteredTodos,
  } = useContext(TodoContext);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  function handlerFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTodo(todoTitle);
    setTodoTitle('');
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todoList.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: filteredTodos.todosCompleted.length === todoList.length,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}

          <form onSubmit={handlerFormSubmit}>
            <input
              ref={inputRef}
              autoFocus
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todoList
            .filter(todo => {
              if (selectedFilter === 'active') {
                return todo.completed === false;
              } else if (selectedFilter === 'completed') {
                return todo.completed === true;
              } else {
                return todoList;
              }
            })
            .map(todo => (
              <Todos todo={todo} key={todo.id} />
            ))}
        </section>

        {todoList.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {filteredTodos.todosNotCompleted.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={classNames('filter__link', {
                  selected: selectedFilter === 'all',
                })}
                data-cy="FilterLinkAll"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </a>

              <a
                href="#/active"
                className={classNames('filter__link', {
                  selected: selectedFilter === 'active',
                })}
                data-cy="FilterLinkActive"
                onClick={() => setSelectedFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={classNames('filter__link', {
                  selected: selectedFilter === 'completed',
                })}
                data-cy="FilterLinkCompleted"
                onClick={() => setSelectedFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              disabled={filteredTodos.todosCompleted.length <= 0}
              data-cy="ClearCompletedButton"
              onClick={() => removeCompletedTodos()}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
