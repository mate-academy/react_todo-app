import React, { useState } from 'react';
import { MainSection } from './components/MainSection';
import { Footer } from './components/Footer';
import { Todo } from './types/todo';
import { Header } from './components/Header';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(`${localStorage.getItem('todos')}`) || []);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const makeTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const validTodoTitle = newTodoTitle.trim();

    if (validTodoTitle) {
      const newTodoObj = {
        id: Math.random().toString(36).slice(2, 7),
        title: validTodoTitle,
        completed: false,
      };

      setTodos([...todos, newTodoObj]);
      localStorage.setItem('todos', JSON.stringify([...todos, newTodoObj]));
      setNewTodoTitle('');
    }
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const toggleTodoStatus = (id: string) => {
    let updatedTodos;

    if (id === 'toggleAll') {
      if (todos.some(todo => todo.completed === false)) {
        updatedTodos = todos.map(
          todo => ({ ...todo, completed: true }),
        );
      } else {
        updatedTodos = todos.map(
          todo => ({ ...todo, completed: false }),
        );
      }
    } else {
      updatedTodos = todos.map(todo => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo));
    }

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <div className="todoapp">
      <Header
        makeTodo={makeTodo}
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
      />
      <MainSection
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodoStatus={toggleTodoStatus}
        setTodos={setTodos}
      />
      {todos[0] && (
        <Footer todos={todos} setTodos={setTodos} />
      )}
    </div>
  );
};
