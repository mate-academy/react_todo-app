/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import { useLocalSorage } from './hooks/useLocalStorage';

import { TodosContext } from './components/TodosContext';
import { TodosControls } from './components/TodosControls';
import { TodoInput } from './components/TodoInput';
import { TodosList } from './components/TodosList';

import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalSorage<Todo[]>('todos', []);
  const [status, setStatus] = useState(Status.all);
  const [amountOfActive, setAmountOfActive] = useState(0);

  useEffect(() => {
    setAmountOfActive(todos.filter(item => !item.completed).length);
  }, [setAmountOfActive, todos]);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      status,
      setStatus,
      amountOfActive,
      setAmountOfActive,
    }}
    >
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <TodoInput />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <TodosList />
            <TodosControls />
          </>
        )}
      </div>
    </TodosContext.Provider>
  );
};
