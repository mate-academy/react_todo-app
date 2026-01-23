/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import './styles/todoapp.scss';
import './styles/filters.scss';
import { TodoContext } from './context/TodoContex';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

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
          <TodoList todos={todoList} selectedFilter={selectedFilter} />
        </section>

        {todoList.length > 0 && (
          <Footer
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filteredTodos={filteredTodos}
            removeCompletedTodos={removeCompletedTodos}
          />
        )}
      </div>
    </div>
  );
};
