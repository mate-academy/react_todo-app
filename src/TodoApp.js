import React, { useContext, useState, useEffect } from 'react';
import { TodosContext } from './TodosContext';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

export const TodoApp = () => {
  const { todos, setNewTodos } = useContext(TodosContext);
  const isAllChecked = todos.every(todo => todo.completed === true);
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [inputedValue, setIputValue] = useState('');
  const [toggleAll, setToggleAll] = useState(isAllChecked);

  useEffect(() => {
    setToggleAll(isAllChecked);
    setCurrentTodos(todos);
  }, [todos]);

  const toggleAllItems = () => {
    if (!isAllChecked) {
      setNewTodos(
        todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      );
    } else {
      setNewTodos(
        todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      );
    }
  };

  const writeTodo = (event) => {
    event.preventDefault();
    if (inputedValue === '') {
      return;
    }

    setNewTodos([
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
    setNewTodos(todos.filter(todo => todo.completed === false));
  };

  return (
    /* eslint-disable */
    <section
      className="todoapp"
    >
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={writeTodo}
        >
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
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          items={currentTodos}
        />
      </section>


        {!!todos.length && (
          <footer className="footer">
          <span className="todo-count">
            {`${todos.filter(todo => todo.completed === false).length} items left`}
          </span>
          <TodosFilter
          filterTodos={setCurrentTodos}
          />
          {!!todos.filter(todo => todo.completed === true).length && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>)}
      </footer>
        )}
    </section>
  );
}
