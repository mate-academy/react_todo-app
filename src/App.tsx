import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AddNewTodo } from './components/AddNewTodo';
import { TodoList } from './components/TodoList';
import { TodosContext } from './components/TodosContext';
import { TodosFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const itemsLeft = todos.filter(todo => !todo.completed);
  const location = useLocation();
  const filterBy = location.hash;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddNewTodo />
      </header>
      {todos.length !== 0 && (
        <>
          <section className="main">
            <TodoList items={todos} filterBy={filterBy} />
          </section>

          <footer className="footer">
            {itemsLeft.length > 0 && (
              <span className="todo-count" data-cy="todosCounter">
                {itemsLeft.length === 1
                  ? `${itemsLeft.length} item left`
                  : `${itemsLeft.length} items left`}
              </span>
            )}
            <TodosFilter data-cy="todosFilter" selectBy={filterBy} />
          </footer>
        </>
      )}
    </div>
  );
};
