/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Todo } from './types';
//import { TodoStateContext } from './StoreContext';

function useLolcalStorage(key: string, defaultValue) {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(key);

    if (savedTodos === null) {
      localStorage.setItem('todos', '[]');

      return JSON.parse(localStorage.getItem('todos') as string);
    } else {
      return JSON.parse(savedTodos);
    }

    // try {
    //   return JSON.parse(savedTodos);
    // } catch (error) {
    //   localStorage.removeItem('todos');

    //   return JSON.parse(defaultValue);
    // }
  });

  function saveTodos(newTodos: Todo[]) {
    setTodos(newTodos);

    localStorage.setItem(key, JSON.stringify(newTodos));
  }

  return [todos, saveTodos] as const;
}

export const App: React.FC = () => {
  // const { todos, setTodos } = useContext(TodoStateContext);
  const [todos, setTodos] = useLolcalStorage('todos', JSON.stringify([]));
  const [isActive, setIsActiveTab] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const filteredTodos = todos.filter((todo: Todo) => {
    if (isActive.active) {
      return todo.completed === false;
    }

    if (isActive.completed) {
      return todo.completed === true;
    }

    return todo;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} setTodos={setTodos} />

        {todos.length > 0 && <Main todos={filteredTodos} setTodos={setTodos} />}

        {todos.length > 0 && (
          <Footer
            todos={todos}
            isActive={isActive}
            setIsActiveTab={setIsActiveTab}
            setTodos={setTodos}
          />
        )}
      </div>
    </div>
  );
};
