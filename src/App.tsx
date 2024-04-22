/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback } from 'react';

import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = useCallback((updatedTodo: Todo) => {
      let newTodos = [...todos];
      const index = newTodos.findIndex(todo => todo.id === updatedTodo.id);

      if (index >= 0) {
        setTodos(newTodos.splice(index, 1, updatedTodo));
      } else {
        setTodos([...todos, updatedTodo]);
      }
    },
    [setTodos, todos],
  );

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
