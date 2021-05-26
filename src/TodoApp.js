import React, { useContext, useCallback } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { TodosContext } from './TodosContext';

function TodoApp() {
  const { todos, setTodos } = useContext(TodosContext);

  const addNewTodo = useCallback((newTodo) => {
    setTodos([...todos, newTodo]);
  }, [todos]);

  // const filterTodos = (filterBy) => {
  //   setSelectedInput(!selectedInput);

  //   switch (filterBy) {
  //     case 'all':
  //       return todos;
  //     case 'active':
  //       return todosFilterBy(false);
  //     case 'completed':
  //       return todosFilterBy(true);
  //     default:
  //       return todos;
  //   }
  // };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <TodoForm onAddNewTodo={addNewTodo} />
      </header>

      <section className="main">
        {todos && (
          <TodoList />
        )}
      </section>

      <footer className="footer">
        <TodoFilter />
      </footer>
    </section>
  );
}

export default TodoApp;
