import React, { useState } from 'react';
import { TodoList } from './TodoList';
import Context from './context';
import { Header } from './Header';
import { Footer } from './Footer';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Learn HTML/CSS',
      completed: false,
    },
    {
      id: 2,
      title: 'Learn React',
      completed: false,
    },
    {
      id: 3,
      title: 'Learn JavaScript',
      completed: false,
    },
  ]);

  const [filter, setFilter] = useState('All');

  function todoToggle(id) {
    return setTodos(
      prev => prev.map((todo) => {
        const { completed } = todo;

        if (todo.id === id) {
          return {
            ...todo,
            completed: !completed,
          };
        }

        return todo;
      }),
    );
  }

  function toggleAllTodos(todosItems) {
    return todosItems.some(todo => todo.completed === false)
      ? setTodos(todosItems.map(todo => ({
        ...todo,
        completed: true,
      })))
      : setTodos(todosItems.map(todo => ({
        ...todo,
        completed: false,
      })));
  }

  function addTodo(value) {
    return setTodos(
      [
        ...todos,
        {
          id: Date.now(),
          title: value,
          completed: false,
          filter: 'All',
        },
      ],
    );
  }

  function removeTodo(id) {
    return setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  function clearedCompleted() {
    return setTodos(prev => prev.filter(todo => todo.completed === false));
  }

  function addFilter(name) {
    return setFilter(name);
  }

  let allTodos = [];

  switch (filter) {
    case 'Active':
      allTodos = todos.filter(todo => todo.completed === false);
      break;
    case 'Completed':
      allTodos = todos.filter(todo => todo.completed === true);
      break;
    default:
      allTodos = todos;
      break;
  }

  return (
    <Context.Provider value={{
      todoToggle, removeTodo, addFilter, filter,
    }}
    >
      <section className="todoapp">
        <Header addTodo={addTodo} />
        <section className="main">
          <TodoList todos={allTodos} toggleAllTodos={toggleAllTodos} />
        </section>

        {todos.length
          ? (
            <Footer
              todos={allTodos}
              initialTodo={todos}
              clearedCompleted={clearedCompleted}
              filterType={filter}
            />
          )
          : ''
        }
      </section>
    </Context.Provider>
  );
}

export default App;
