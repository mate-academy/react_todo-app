import React, { useState, useContext, useCallback, useMemo } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { TodosContext } from './TodosContext';

function TodoApp() {
  const { todos, setTodos } = useContext(TodosContext);
  const [filter, setFilter] = useState('All');

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const addNewTodo = useCallback((newTodo) => {
    setTodos([...todos, newTodo]);
  }, [todos, setTodos]);

  const handleToggleAll = () => (
    (todos.some(todo => !todo.completed))
      ? setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })))
      : setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })))
  );

  const filterTodos = useCallback((filterBy) => {
    switch (filterBy) {
      case 'Active':
        return activeTodos;
      case 'Completed':
        return completedTodos;
      case 'All':
      default:
        return todos;
    }
  }, [todos, activeTodos, completedTodos]);

  const deleteCompletedTodos = useCallback(() => {
    setTodos(activeTodos);
  }, [activeTodos, setTodos]);

  const filteredTodos = useMemo(
    () => filterTodos(filter),
    [filter, filterTodos],
  );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <TodoForm onAddNewTodo={addNewTodo} />
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={filteredTodos} />

          </section>

          <footer className="footer">
            <TodoFilter
              activeTodos={activeTodos}
              completedTodos={completedTodos}
              todos={filteredTodos}
              filter={filter}
              setFilter={setFilter}
              onDeleteCompletedTodos={deleteCompletedTodos}
            />
          </footer>
        </>
      )}
    </section>
  );
}

export default TodoApp;
