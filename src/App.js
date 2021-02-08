import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodo] = useState('');
  const [status, setStatus] = useState(false);
  const [selectedFilter, setFilter] = useState('All');

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

    if (newTodoTitle.length > 0) {
      setTodos(prevTodos => (
        [...prevTodos,
          {
            id: +new Date(),
            title: newTodoTitle,
            completed: false,
          },
        ]
      ));
      setNewTodo('');
    }
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const toggleCompletedStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todoId === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const makeAllTodosComplete = () => {
    if (status) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    }

    setStatus(!status);
  };

  const updateTitle = (id, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todos,
          title,
        };
      }

      return todo;
    }));
  };

  const completedTodos = todos.filter(todo => todo.completed);
  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const clearCompleted = () => {
    setTodos(uncompletedTodos);
  };

  const FILTERS = {
    All: 'All',
    Active: 'Active',
    Completed: 'Completed',
  };

  // eslint-disable-next-line consistent-return
  const filterTodos = (key) => {
    switch (key) {
      case 'All':
        return todos;

      case 'Active':
        return uncompletedTodos;

      case 'Completed':
        return completedTodos;

      default:
        break;
    }
  };

  const filteredTodos = filterTodos(FILTERS[selectedFilter]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={event => setNewTodo(event.target.value.trimLeft())}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={makeAllTodosComplete}
        />

        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          filteredTodos={filteredTodos}
          deleteTodo={deleteTodo}
          status={toggleCompletedStatus}
          updateTitle={updateTitle}
        />
      </section>
      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {uncompletedTodos.length}
            {' '}
            items left
          </span>

          <TodosFilter
            setFilter={setFilter}
            selectedFilter={selectedFilter}
          />

          {completedTodos.length > 0 && (
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
