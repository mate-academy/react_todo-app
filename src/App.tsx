/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback } from 'react';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('ids', []);

  const addTodo = useCallback((updatedTodo: Todo) => {
    setTodos(curentTodos => {
      let newTodos = [...curentTodos];
      const index = newTodos.findIndex(todo => todo.id === updatedTodo.id);

      if (index >= 0) {
        newTodos.splice(index, 1, updatedTodo);
      } else {
        newTodos = [...curentTodos, updatedTodo];
      }

      return newTodos;
    });
  }, []);

  const isEmpty = todos.length <= 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isEmpty={isEmpty} onAdd={addTodo} />

        {!isEmpty && <Main todos={todos} onAdd={addTodo} />}
        {!isEmpty && <Footer todos={todos} />}
      </div>
    </div>
  );
};
