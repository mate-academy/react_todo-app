/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { Header } from './Components/header';

import { useLocalStorage } from './utils/useLocalStorage';
import { todoContext } from './utils/todoContext';

import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.ALL);
  const [todos, setTodos] = useLocalStorage('todos', []);

  const handleTodoDelete = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  const visibleTodos = useMemo(() => {
    switch (filterBy) {
      case FilterType.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filterBy, todos]);

  const deleteAllCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);

    setTodos(updatedTodos);
  };

  return (
    <todoContext.Provider
      value={{
        todos,
        setTodos,
        filterBy,
        setFilterBy,
      }}
    >

      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          {todos.length > 0 && (
            <>
              <TodoList
                todos={visibleTodos}
                onDelete={handleTodoDelete}
                setTodos={setTodos}
              />

              <Footer
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                todos={visibleTodos}
                onDelete={deleteAllCompletedTodos}
              />
            </>
          )}
        </div>
      </div>
    </todoContext.Provider>
  );
};
