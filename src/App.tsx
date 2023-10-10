import React from 'react';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodo] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = (newTodo: Todo) => {
    setTodo([...todos, newTodo]);
  };

  return (
    <div className="todoapp">
      <Header onAdd={addTodo} />
      <Main todos={todos} />
      {false && (
        <Footer />
      )}
    </div>
  );
};
