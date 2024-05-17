/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterTodo, setFilter] = useState<Status>(Status.All);
  const titleFieldRef = useRef<HTMLInputElement>(null);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +Date.now(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };

  useEffect(() => {
    if (titleFieldRef.current) {
      titleFieldRef.current.focus();
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          addTodo={addTodo}
          todos={todos}
          inputRef={titleFieldRef}
          setTodos={setTodos}
        />
        <TodoList
          todos={todos}
          filterTodo={filterTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        {todos.length !== 0 && (
          <Footer
            todos={todos}
            filterTodo={filterTodo}
            setFilter={setFilter}
            setTodos={setTodos}
          />
        )}
      </div>
    </div>
  );
};
