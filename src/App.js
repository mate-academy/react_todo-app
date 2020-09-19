import React, { useState, useEffect, useMemo } from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { FILTER } from './constants';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({});
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

  const changeStatus = (todoId) => {
    const changedTodos = todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    });

    setTodos(changedTodos);
  };

  const changeStatusAllTodos = () => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: completedTodos.length !== todos.length,
      })),
    );
  };

  const selectTodosType = (type) => {
    setTodosType(type);
  };

  const filteredTodos = useMemo(() => {
    switch (todosType) {
      case FILTER.active:
        return uncompletedTodos;

      case FILTER.completed:
        return completedTodos;

      default:
        return todos;
    }
  }, [todos, todosType]);

  const clearCompleted = () => {
    setTodos(uncompletedTodos);
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
              onChange={changeStatusAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              items={filteredTodos}
              changeStatus={changeStatus}
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
