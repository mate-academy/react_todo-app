import React, { useEffect, useMemo, useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { TodoInput } from './TodoInput';

export const TodoApp = React.memo(() => {
  const [todos, setTodos] = useState([]);
  const [isAllTodosSelected, setIsAllTodosSelected] = useState(true);
  const [filter, setFilter] = useState('All');

  const filterType = {
    Completed: 'Completed',
    Active: 'Active',
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case filterType.Completed:
        return todos.filter(todo => todo.completed);

      case filterType.Active:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  }, [filter, todos]);

  const allCompletedHandler = () => {
    setIsAllTodosSelected(prev => !prev);
    setTodos(todos.map(todo => ({
      ...todo,
      completed: isAllTodosSelected,
    })));
  };

  const removeCompletedTodosHandler = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  useEffect(() => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos, filter]);

  const activeTodos = [...filteredTodos]
    .filter(todo => !todo.completed).length;

  const activeTodosLeft = `${activeTodos} items left`;

  const completedTodos = [...filteredTodos]
    .filter(todo => todo.completed);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>React Todo</h1>
        <TodoInput setTodos={setTodos} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={allCompletedHandler}
          checked={completedTodos.length > 0}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={filteredTodos}
          setTodos={setTodos}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {activeTodosLeft}
          </span>

          <TodosFilter
            todos={filteredTodos}
            setFilter={setFilter}
          />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={removeCompletedTodosHandler}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
});
