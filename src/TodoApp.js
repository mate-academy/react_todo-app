import React, { useContext, useState, useEffect } from 'react';
import { TodosContext } from './TodosContext';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const isAllChecked = todos.every(todo => todo.completed);
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [inputedValue, setIputValue] = useState('');
  const [toggleAll, setToggleAll] = useState(isAllChecked);

  useEffect(() => {
    setToggleAll(isAllChecked);
    setCurrentTodos(todos);
  }, [todos]);

  const toggleAllItems = () => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !isAllChecked,
      })),
    );
  };

  const addTodo = (event) => {
    event.preventDefault();
    if (inputedValue === '') {
      return;
    }

    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: inputedValue,
        completed: false,
      },
    ]);
    setIputValue('');
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addTodo}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputedValue}
            onChange={(event) => {
              setIputValue(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={toggleAll}
          onChange={toggleAllItems}
        />
        {!!todos.length && (
          <label htmlFor="toggle-all">Mark all as complete</label>
        )}

        <TodoList
          items={currentTodos}
        />
      </section>
      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count">
            {`${todos.filter(todo => todo.completed === false).length}
            items left`}
          </span>
          <TodosFilter
            filterTodos={setCurrentTodos}
          />
          {!!todos.filter(todo => todo.completed === true).length
          && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
};
