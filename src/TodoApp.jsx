import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, addNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const completedTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    const items = [];

    if (localStorage.length === 0) {
      localStorage.setItem('todos', JSON.stringify(items));
    }

    const todosFromStorage = JSON.parse(localStorage.getItem('todos'));

    setTodos(todosFromStorage);
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

    addNewTodo('');
  };

  const updateTodoStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== todoId) {
        return { ...todo };
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    }));
  };

  const updateTodoTitle = (todoId, newTitle) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== todoId) {
        return { ...todo };
      }

      return {
        ...todo,
        title: newTitle,
      };
    }));
  };

  const toogleAll = (event) => {
    setTodos(todos.map(todo => (
      {
        ...todo,
        completed: event.target.checked,
      }
    )));
  };

  const filterTodos = (items, status) => {
    switch (status) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.completed);
      case 'completed':
        return items.filter(item => item.completed);
      default:
        return 'Error!';
    }
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

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
            onChange={event => addNewTodo(event.target.value)}
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
                  checked={completedTodos === 0}
                  onChange={toogleAll}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
              </>
            )}
            <TodoList
              items={filterTodos(todos, filter)}
              checkTodo={updateTodoStatus}
              removeTodo={deleteTodo}
              updateTitle={updateTodoTitle}
            />
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${completedTodos} items left`}
            </span>

            <TodosFilter
              handleFilter={status => setFilter(status)}
              selectedFilter={filter}
            />
            {todos.length > 0 && (
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
