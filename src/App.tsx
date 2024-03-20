import React, { useState, useEffect } from 'react';
import { Status, Todo } from './types/types';
import { TodosContext } from './TodosContext';
import { Footer } from './components/Footer/Footer';
import { FormTodo } from './components/FormTodo/FormTodo';
import { Main } from './components/Main/Main';

export const App: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filterStatus,
        setFilterStatus,
      }}
    >
      <div className="todoapp">
        <FormTodo />
        <Main />
        {todos.length > 0 && <Footer />}
      </div>
    </TodosContext.Provider>
  );
};
