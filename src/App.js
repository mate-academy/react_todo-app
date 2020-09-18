import React, { useState, useEffect } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({});
  const [allTodosActive, setAllTodosActive] = useState(true);
  const [todosType, setTodosType] = useState('All');
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const FILTER = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  };

  const changeCompleted = (todoId) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });

    setTodos(changedTodos);
  };

  const setStatusAllTodos = () => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: allTodosActive,
      })),
    );

    setAllTodosActive(!allTodosActive);
  };

  const selectTodosType = (type) => {
    setTodosType(type);
  };

  let filteredTodos;

  switch (todosType) {
    case FILTER.active:
      filteredTodos = uncompletedTodos;
      break;

    case FILTER.completed:
      filteredTodos = completedTodos;
      break;

    default:
      filteredTodos = todos;
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const changeTodo = (todoId, newValue) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title: newValue };
    }));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
          if (currentTitle) {
            setTodos([...todos, newTodo]);
          }

          setCurrentTitle('');
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={currentTitle}
            onChange={(event) => {
              setCurrentTitle(event.target.value.trimLeft());
              setNewTodo({
                id: +new Date(),
                title: event.target.value.trimLeft(),
                completed: false,
              });
            }}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={completedTodos.length === todos.length}
              onChange={setStatusAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              items={filteredTodos}
              changeCompleted={changeCompleted}
              removeTodo={removeTodo}
              changeTodo={changeTodo}
            />

          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${uncompletedTodos.length} items left`}
            </span>

            <TodoFilter
              todosType={todosType}
              selectTodosType={selectTodosType}
              all={FILTER.all}
              active={FILTER.active}
              completed={FILTER.completed}
            />

            {completedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </section>
  );
}

export default TodoApp;
