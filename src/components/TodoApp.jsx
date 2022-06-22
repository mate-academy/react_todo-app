import React, { useEffect, useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp = React.memo(() => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState(false);
  const [filter, setFilter] = useState('All');
  const [filteredTodos, setFilteredTodos] = useState([]);

  const onClickHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    const id = +new Date();
    const todo = {
      id,
      title: input,
      completed: false,
    };

    setTodos(state => [...state, todo]);
    setInput('');
  };

  const allCompletedHandler = () => {
    setAllTodos(!allTodos);
    setTodos(todos.map((todo) => {
      if (allTodos) {
        return {
          ...todo,
          completed: true,
        };
      }

      return {
        ...todo,
        completed: false,
      };
    }));
  };

  const filterHandler = () => {
    switch (filter) {
      case 'Completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;

      case 'Active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const removeTodosHandler = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const setToLocalStrg = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    setToLocalStrg();
  }, [todos, filter]);

  const activeTodos = [...filteredTodos]
    .filter(todo => !todo.completed).length;

  const completedTodos = [...filteredTodos]
    .filter(todo => todo.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>React Todo</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            data-cy="createTodo"
            value={input}
            onChange={e => onClickHandler(e)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={allCompletedHandler}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={filteredTodos}
          setTodos={setTodos}
          setInput={setInput}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {activeTodos}
            {' '}
            items left
          </span>

          <TodosFilter
            todos={filteredTodos}
            setFilter={setFilter}
          />

          {completedTodos > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={removeTodosHandler}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
});
