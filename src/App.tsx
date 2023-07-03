import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem('todos');

    if (todosFromLocalStorage) {
      setAllTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(allTodos));
  }, [allTodos]);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: nanoid(10),
      title,
      completed: false,
    };

    setAllTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setAllTodos(prevTodos => prevTodos.map(
      todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      },
    ));
  };

  const handleDeleteTodo = (id: string) => {
    setAllTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const completed = event.target.checked;

    setAllTodos(prevTodos => prevTodos.map(todo => ({ ...todo, completed })));
  };

  const handleClearCompleted = () => {
    setAllTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const handleFilterChange = (filter: Filter) => {
    setActiveFilter(filter);
  };

  const showFooterAndToggleAll = allTodos.length > 0;

  return (
    <div className="todoapp">
      <TodoApp onAddTodo={handleAddTodo} />

      {showFooterAndToggleAll && (
        <>
          <TodoList
            todos={allTodos}
            filter={activeFilter}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onToggleAll={handleToggleAll}
            setAllTodos={setAllTodos}
          />

          <Footer
            todos={allTodos}
            onClearCompleted={handleClearCompleted}
            onFilterChange={handleFilterChange}
            activeFilter={activeFilter}
          />
        </>
      )}
    </div>
  );
};
