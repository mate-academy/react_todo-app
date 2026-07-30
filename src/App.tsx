/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { TodoItem } from './components/TodoItem';
import { useTodo } from './hooks/useTodo';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const {
    todos,
    visibleTodos,
    title,
    setTitle,
    filter,
    setFilter,
    newTodoInputRef,
    handleSubmit,
    handleDeleteTodo,
    handleToggleAll,
    handleClearCompleted,
    hasCompletedTodos,
    activeTodosCount,
    focusNewTodoInput,
  } = useTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames('todoapp__toggle-all', {
                active: todos.every(todo => todo.completed),
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}
          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              ref={newTodoInputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
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
                  onDelete={handleDeleteTodo}
                  onFocusNewTodo={focusNewTodoInput}
                />
              ))}
            </section>

            <Footer
              activeTodosCount={activeTodosCount}
              filter={filter}
              setFilter={setFilter}
              handleClearCompleted={handleClearCompleted}
              hasCompletedTodos={hasCompletedTodos}
            />
          </>
        )}
      </div>
    </div>
  );
};
