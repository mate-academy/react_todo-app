import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { Todo } from './types/todoTypes';
import { Status } from './types/enumTypes';
import { TodoContext } from './components/TodoContext';
import { Header } from './components/Header';
import { useLocalStorage } from './components/hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState(Status.All);

  const handleTodosFilter = (
  ) => {
    switch (filterBy) {
      case Status.All:
        return todos;

      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const preparedTodos = handleTodosFilter();

  return (
    <div className="todoapp">
      <TodoContext.Provider value={{
        todos,
        preparedTodos,
        setTodos,
        setFilterBy,
        filterBy,
      }}
      >
        <Header />
        <TodoList />
        {todos.length > 0 && (<TodosFilter />)}
      </TodoContext.Provider>
    </div>
  );
};
