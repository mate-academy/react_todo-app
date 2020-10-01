import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState('');

  const changeCompleted = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const markAllCompleted = () => {
    if (todos.every(todo => todo.completed)) {
      setTodos(todos.map(todo => ({ ...todo, completed: !todo.completed })));
    } else {
      setTodos(todos.map((todo) => {
        if (!todo.completed) {
          return { ...todo, completed: true };
        }

        return todo;
      }));
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value.trimLeft());
  };

  const handleAdd = () => {
    if (query) {
      setTodos([{
        id: +new Date(),
        title: query,
        completed: false,
      }, ...todos]);
      setQuery('');
    }
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={handleChange}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                handleAdd();
              }
            }}
          />
        </form>
      </header>

      <TodoList
        todos={todos}
        changeCompleted={changeCompleted}
        markAllCompleted={markAllCompleted}
      />
      <TodosFilter todos={todos} />
    </>
  );
};
