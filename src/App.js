import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFIlter';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [notCompletedTodos, setNotCompletedTodos] = useState([]);

  useEffect(() => {
    getNotCompletedTodos(todos);
  }, [todos]);

  const createTodo = (title) => {
    setTodos([
      ...todos,
      {
        title,
        id: +new Date(),
        completed: false,
      },
    ]);
  };

  const getNotCompletedTodos = (allTodos) => {
    setNotCompletedTodos(
      allTodos.filter(todo => todo.completed === false),
    );
  };

  const changeTodoStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const toggleAll = () => {
    if (todos.every(todo => todo.completed)) {
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
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            className="new-todo"
            value={todoTitle}
            placeholder="What needs to be done?"
            onChange={(event) => {
              setTodoTitle(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && todoTitle) {
                createTodo(todoTitle);
                setTodoTitle('');
              }
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          checked={todos.length > 0 && todos.every(todo => todo.completed)}
          className="toggle-all"
          onChange={() => {
            toggleAll();
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={todos}
          changeStatus={changeTodoStatus}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <TodosFilter
            todos={todos}
            uncomplitedTodos={notCompletedTodos}
          />
        </footer>
      )}
    </section>
  );
}

export default App;
