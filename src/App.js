import React, { useState, useEffect, useMemo } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

function App() {
  const [todos, updateTodos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('todos')) {
      updateTodos(
        JSON.parse(localStorage.getItem('todos')),
      );
    }
  }, []);

  let filteredTodos = [...todos];

  const FILTER = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  };
  const [selectedFilter, selectFilter] = useState(FILTER.all);

  useMemo(() => filter(selectedFilter), [selectedFilter]);

  const todoTools = {
    todos,
    updateTodos,
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function filter(filterBy) {
    switch (filterBy) {
      case FILTER.active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case FILTER.completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        filteredTodos = [...todos];
        break;
    }
  }

  function changeProperty(todoId, property) {
    updateTodos(
      todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        if (property) {
          return {
            ...todo, title: property,
          };
        }

        if (!property) {
          return {
            ...todo, completed: !todo.completed,
          };
        }

        return todo;
      }),
    );
  }

  function receiveTodo(newTodo) {
    updateTodos([
      newTodo,
      ...todos,
    ]);
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <AddTodo
          sendTodo={receiveTodo}
        />
      </header>

      {todos.length > 0
      && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.every(todo => todo.completed)}
            onChange={({ target }) => {
              updateTodos(
                todos.map((todo) => {
                  if (todo.completed === target.checked) {
                    return todo;
                  }

                  return { ...todo, completed: !todo.completed };
                }),
              );
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            changeProperty={changeProperty}
            todosTools={todoTools}
            todos={filteredTodos}
          />
        </section>
      )
      }
      {todos.length > 0
      && (
        <footer className="footer">
          <TodosFilter
            todoTools={todoTools}
            filter={filter}
            FILTER_OPT={{ ...FILTER }}
            selectedFilter={selectedFilter}
            selectFilter={selectFilter}
          />
        </footer>
      )}
    </section>
  );
}

export default App;
