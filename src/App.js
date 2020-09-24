import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { FILTERS } from './constants';

function App() {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState(null);
  const [filter, setFilter] = useState(FILTERS.all);
  const completedTodosCount = todos
    ? todos.filter(todo => !todo.completed).length : 0;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    if (todos && todos.length === 0) {
      setTodos(null);
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();

    if (todoTitle === ' ') {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    if (todoTitle && todos) {
      setTodos([
        ...todos,
        newTodo,
      ]);
      setTodoTitle('');
    } else if (!todos) {
      setTodos([newTodo]);
      setTodoTitle('');
    }
  };

  const todoStatusToggle = useCallback(
    (todoId) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo,
            completed: !todo.completed };
        }

        return todo;
      });

      setTodos(updatedTodos);
    }, [todos],
  );

  const editTodoTitle = useCallback(
    (todoId, title) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo,
            title };
        }

        return todo;
      });

      setTodos(updatedTodos);
    }, [todos],
  );

  const toggleTodos = useCallback(
    (event) => {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: event.target.checked,
      })));
    }, [todos],
  );

  const deleteCompleted = useCallback(
    () => {
      setTodos(todos.filter(todo => !todo.completed));
    }, [todos],
  );

  const deleteTodo = useCallback(
    (todoId) => {
      setTodos(todos.filter(todo => todo.id !== todoId));
    }, [todos],
  );

  const filteredTodos = (unfilteredTodos, currentFilter) => {
    if (unfilteredTodos) {
      switch (currentFilter) {
        case FILTERS.active:
          return unfilteredTodos.filter(item => !item.completed);
        case FILTERS.completed:
          return unfilteredTodos.filter(item => item.completed);
        default:
          return unfilteredTodos;
      }
    }

    return unfilteredTodos;
  };

  const preparedTodos = useMemo(
    () => filteredTodos(todos, filter),
    [todos, filter],
  );

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={event => setTodoTitle(event.target.value)}
            value={todoTitle.trimLeft()}
          />
        </form>
      </header>

      <section className="main">
        {todos && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={todos.every(todo => todo.completed)}
              onChange={toggleTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          setTodos={setTodos}
          todos={preparedTodos}
          todoStatusToggle={todoStatusToggle}
          editTodoTitle={editTodoTitle}
          deleteTodo={deleteTodo}
        />
      </section>

      {todos && (
        <footer className="footer">
          <span className="todo-count">
            {completedTodosCount}
            {completedTodosCount === 1 ? ' item left' : ' items left'}
          </span>

          <TodoFilters
            currentFilter={filter}
            getFilter={setFilter}
          />

          {todos.find(todo => todo.completed) && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteCompleted}
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
