/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useContext } from 'react';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { TodosContext } from './components/TodosContext';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const deleteCompletedTodos = useCallback(() => {
    setTodos(todos.filter(todo => !todo.completed));
  }, [todos, setTodos]);

  const canToggleAll = todos.length > 0;
  const allTodosCompleted = !todos.every((todo) => todo.completed);

  const handleToggleAllClick = () => {
    if (canToggleAll) {
      const newAllCompleted = allTodosCompleted;

      setTodos(todos.map((todo) => (
        { ...todo, completed: newAllCompleted }
      )));
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo />
      </header>

      <section className="main">
        {todos.length > 0 && (
          <div>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={allTodosCompleted}
              onChange={handleToggleAllClick}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </div>
        )}

        <TodoList />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          <TodosFilter />
          {todos.filter(todo => todo.completed).length > 0 && (
            <button
              type="button"
              className="clear-completed"
              aria-label="Delete"
              onClick={deleteCompletedTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
