import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import Context from './components/Context/Context';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'TodoApp',
      completed: false,
    },
  ]);

  const [filter, setFilter] = useState('All');

  const todoToggle = id => setTodos(
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

  const toggleAllTodos = todosItems => (
    todosItems.some(todo => todo.completed === false)
      ? setTodos(todosItems.map(todo => ({
        ...todo,
        completed: true,
      })))
      : setTodos(todosItems.map(todo => ({
        ...todo,
        completed: false,
      })))
  );

  const addTodo = value => setTodos(
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

  const removeTodo = id => setTodos(
    prev => prev.filter(todo => todo.id !== id),
  );

  const clearedCompleted = () => setTodos(
    prev => prev.filter(todo => todo.completed === false),
  );

  const addFilter = name => setFilter(name);

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
