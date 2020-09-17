import React, { useState, useEffect } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

function App() {
  const [todos, updateTodos] = useState([]);
  const [filteredTodos, updateFiltered] = useState([]);
  const [selectedFilter, selectFilter] = useState('All');
  const todoTools = {
    todos,
    updateTodos,
  };

  useEffect(() => {
    updateFiltered(todos);
    filter(selectedFilter);
  }, [todos]);

  function filter(filterBy) {
    selectFilter(filterBy);

    const filterdTodos = todos.filter((todo) => {
      switch (filterBy) {
        case 'Active':
          return !todo.completed;

        case 'Completed':
          return todo.completed;

        default:
          return todo;
      }
    });

    return updateFiltered(filterdTodos);
  }

  function changeProperty(todoId, property) {
    const updatedTodos = todos.map((todo) => {
      const thisTodo = todo;

      if (todo.id === todoId) {
        if (property) {
          thisTodo.title = property;
        }

        if (!property) {
          thisTodo.completed = !todo.completed;
        }
      }

      return thisTodo;
    });

    updateTodos(updatedTodos);
  }

  function receiveTodo(newTodo) {
    !todos
      ? updateTodos([newTodo])
      : updateTodos([
        newTodo,
        ...todos,
      ]);
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodo
          sendTodo={receiveTodo}
        />
      </header>

      <section hidden={todos.length === 0} className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={todos.every(todo => todo.completed)}
          onChange={() => {
            const toggleAll = document.getElementById('toggle-all');
            const updatedTodos = todos.map((todo) => {
              const curTodo = todo;

              curTodo.completed = toggleAll.checked;

              return curTodo;
            });

            updateTodos(updatedTodos);
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          changeProperty={changeProperty}
          todosTools={todoTools}
          todos={filteredTodos}
        />
      </section>

      <footer className="footer">
        <TodosFilter
          todoTools={todoTools}
          filter={filter}
          selectedFilter={selectedFilter}
          selectFilter={selectFilter}
        />
      </footer>
    </section>
  );
}

export default App;
