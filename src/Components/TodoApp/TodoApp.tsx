import React, { useContext, useMemo, useState } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodosContext } from '../../Store';

export const TodoApp: React.FC = () => {
  // eslint-disable-next-line prettier/prettier
  const { addTodo, todos, removeCompletedTodos, remainingTodos, toggleAll } =
    useContext(TodosContext);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const reset = () => {
    setInputValue('');
  };

  const handleInputKeyUp = useMemo(() => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (inputValue.trim().length !== 0) {
        addTodo(inputValue);
        reset();
      }
    };
  }, [inputValue]);

  const hasCompleatedTodos = todos.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleInputKeyUp}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            data-cy="createTodo"
            className="new-todo"
            required
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAll}
        />

        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos.length > 0 && (
          <>
            <TodoList />
            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${remainingTodos} items left`}
              </span>

              <TodoFilter />

              {hasCompleatedTodos && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={removeCompletedTodos}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </section>
    </div>
  );
};
