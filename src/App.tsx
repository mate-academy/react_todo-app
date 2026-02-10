import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Footer } from './components/Footer';
import { TodosContext } from './components/TodosContext';

export const App: React.FC = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error('TodosContext is not available');
  }

  const { todos, toggleAllTodos } = todosContext;
  const [filter, setFilter] = useState<string | undefined>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') {
      return todo;
    }

    if (filter === 'completed') {
      return todo.completed === true;
    }

    if (filter === 'active') {
      return todo.completed === false;
    }

    return todo;
  });

  const toggleAllButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    toggleAllTodos();
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={classNames({
                'todoapp__toggle-all': true,
                active: todos.every(item => item.completed === true),
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAllButtonHandler}
            />
          )}

          <NewTodo />
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && <Footer setFilter={setFilter} />}
      </div>
    </div>
  );
};
