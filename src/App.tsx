import React, { useContext } from 'react';
import { TodosContext } from './components/TodosContext';
import { AddNewTodo } from './components/AddNewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodoFilter';

export const App: React.FC = () => {
  const { filteredTodos, todos } = useContext(TodosContext);
  const visibleFotter = filteredTodos.length < 1 && todos.length < 1;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddNewTodo />
      </header>

      <section className="main">
        <TodoList items={filteredTodos} />
      </section>
      {!visibleFotter && (
        <footer className="footer">
          <TodosFilter />
        </footer>
      )}
    </div>
  );
};
