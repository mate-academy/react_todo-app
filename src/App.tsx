import React, { useState, useContext, useMemo } from 'react';
import { TodosContext } from './components/TodosContext/TodosContext';
import { Filter } from './types/Filter';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const todosContext = useContext(TodosContext);

  const {
    todos,
    addTodo,
    deleteCompletedTodos,
    handlerToggleAll,
    todoCount,
    completedTodos,
    filterTodos,
  } = todosContext;

  const handlerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handlerFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title);

    setTitle('');
  };

  const handlerClearCompleted = () => {
    deleteCompletedTodos();
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(filter);
  }, [filter, filterTodos]);

  return (
    <div className="todoapp">
      <Header
        title={title}
        onFormSubmit={handlerFormSubmit}
        onTitleChange={handlerTitleChange}
      />

      {!!todos.length && (
        <>
          <Main
            handlerToggleAll={handlerToggleAll}
            filteredTodos={filteredTodos}
          />

          <Footer
            todoCount={todoCount}
            setFilter={setFilter}
            handlerClearCompleted={handlerClearCompleted}
            completedTodos={completedTodos}
            filter={filter}
          />
        </>
      )}
    </div>
  );
};
