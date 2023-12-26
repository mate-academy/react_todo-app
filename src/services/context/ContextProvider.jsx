import React, { useEffect, useState } from 'react';

export const Context = React.createContext();

export const ContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(() => {
      const data = localStorage.getItem('todos');

      if (data === null) {
        return [];
      }

      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(newItem) {
    setTodos(prevTodos => [...prevTodos, newItem]);
  }

  function removeTodo(id) {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
  }

  return (
    <Context.Provider value={{
      todos,
      addTodo,
      removeTodo,
    }}
    >
      {children}
    </Context.Provider>
  );
};
