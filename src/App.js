import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FILTERS } from './constants';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { getFilterValue, getTodos } from './store';

const getFilteredTodos = (todos, filterValue) => {
  switch (filterValue) {
    case FILTERS.active:
      return todos.filter(todo => !todo.completed);

    case FILTERS.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

function App() {
  const filterValue = useSelector(getFilterValue);
  const todos = useSelector(getTodos);
  const setTodos = () => {};

  const renameTodo = (todoId, title) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    });

    setTodos(newTodos);
  };

  const addTodo = (title) => {
    const todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, todo]);
  };

  const toggleTodo = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    });

    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(activeTodos);
  };

  const toggleAll = () => {
    const completed = activeTodos.length !== 0;

    const newTodos = todos.map((todo) => {
      if (todo.completed === completed) {
        return todo;
      }

      return { ...todo, completed };
    });

    setTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    setTodos(
      todos.filter(todo => todo.id !== todoId),
    );
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filterValue),
    [todos, filterValue],
  );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm onTodoAdded={addTodo} />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={activeTodos.length === 0}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={filteredTodos}
            onTodoDelete={deleteTodo}
            onTodoRename={renameTodo}
            onTodoToggle={toggleTodo}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {activeTodos.length === 1
              ? `1 item left`
              : `${activeTodos.length} items left`
            }
          </span>

          <TodosFilter />

          {todos.length > activeTodos.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
}

export default App;
