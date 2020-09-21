import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { getfilteredTodos } from './helpers';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );
  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  useEffect(() => {
    if (!localStorage.todos) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newTodo) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: newTodo,
        completed: false,
      },
    ]);

    setNewTodo('');
  };

  const updateTodoItem = useCallback(
    (todoId, newTitle) => {
      setTodos(todos.map((todo) => {
        if (todo.id !== todoId) {
          return { ...todo };
        }

        if (newTitle) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }));
    },
    [todos],
  );

  const toogleAll = (event) => {
    setTodos(todos.map(todo => (
      {
        ...todo,
        completed: event.target.checked,
      }
    )));
  };

  const filteredTodos = useMemo(
    () => getfilteredTodos(todos, filter),
    [todos, filter],
  );

  const deleteTodo = useCallback(
    (todoId) => {
      setTodos(todos.filter(todo => todo.id !== todoId));
    },
    [todos],
  );

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={event => setNewTodo(event.target.value.trim())}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            {todos.length > 0 && (
              <>
                <input
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                  checked={activeTodos === 0}
                  onChange={toogleAll}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
              </>
            )}
            <TodoList
              items={filteredTodos}
              updateTodo={updateTodoItem}
              removeTodo={deleteTodo}
            />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${activeTodos} items left`}
            </span>

            <TodosFilter
              handleFilter={status => setFilter(status)}
              selectedFilter={filter}
            />
            {completedTodos > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  );
};

export default TodoApp;
