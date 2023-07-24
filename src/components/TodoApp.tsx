/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { TodoList } from './TodoList';
import { TodoUpdateContext, TodosContext } from '../store/TodosContext';
import { TodosFilter } from './TodosFilter';
import { getFilteredTodos } from '../services/todo';
import { FilteredBy } from '../types/todo';

export const TodoApp: React.FC = () => {
  const {
    addTodo,
    deleteCompletedTodos,
    toggleTodosStatus,
  } = useContext(TodoUpdateContext);
  const todos = useContext(TodosContext);

  const [query, setQuery] = useState('');
  const [filteredBy, setFilteredBy] = useState<FilteredBy>(FilteredBy.ALL);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [isSomeCompleted, setIsSomeCompleted] = useState(false);

  const onTodoSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    addTodo({
      id: +new Date(),
      title: normalizedQuery,
      completed: false,
    });

    setQuery('');
  };

  const countNotCompletedTodo = React.useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const filteredTodos = React.useMemo(
    () => getFilteredTodos(todos, filteredBy),
    [todos, filteredBy],
  );

  useEffect(() => {
    const isAllTodoCompleted = todos.every(todo => todo.completed === true);
    const isSomeTodoCompleted = todos.some(todo => todo.completed === true);

    setIsAllCompleted(isAllTodoCompleted);
    setIsSomeCompleted(isSomeTodoCompleted);
  }, [todos]);

  const completeAllTodos = () => {
    toggleTodosStatus(!isAllCompleted);
    setIsAllCompleted(!isAllCompleted);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={onTodoSubmit}>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={completeAllTodos}
              checked={isAllCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList filteredTodos={filteredTodos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${countNotCompletedTodo} items left`}
            </span>

            <TodosFilter
              filteredBy={filteredBy}
              onTodosFilter={setFilteredBy}
            />

            {isSomeCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={deleteCompletedTodos}
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
