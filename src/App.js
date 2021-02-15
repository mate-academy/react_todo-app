import React, { useState, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';
import { Footer } from './components/Footer';
import { Context } from './context';

export function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')));

  const filters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
  };

  const [statusToShow, setStatusToShow] = useState(filters.All);
  const [newToDoTitle, setNewToDoTitle] = useState('');

  const active = todos.filter(todo => todo.completed === false);
  const completed = todos.filter(todo => todo.completed === true);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function toDosToShow() {
    if (statusToShow === filters.Completed) {
      return completed;
    }

    if (statusToShow === filters.Active) {
      return active;
    }

    return todos;
  }

  function addTodo(event) {
    if (newToDoTitle.trim().length > 0) {
      setTodos([
        ...todos,
        { title: newToDoTitle, id: +new Date(), completed: false },
      ]);
      setNewToDoTitle('');
    }
  }

  const changeTodoStatus = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    }));
  };

  const changeTodoTitle = (todoId, newTitleToSet) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title: newTitleToSet };
      }

      return todo;
    }));
  };

  const changeAllTodosStatus = (statusToSet) => {
    setTodos(todos.map(
      todo => ({ ...todo, completed: statusToSet }),
    ));

    if (statusToShow !== filters.All) {
      if (statusToSet) {
        setStatusToShow(filters.Completed);
      } else {
        setStatusToShow(filters.Active);
      }
    }
  };

  function shouldToddleAllBeVisible() {
    return (
      active.length === todos.length
        || completed.length === todos.length
    ) && todos.length > 0;
  }

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  return (
    <Context.Provider
      value={{
        filters,
        changeTodoStatus,
        removeTodo,
        changeTodoTitle,
      }}
    >

      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newToDoTitle}
              onChange={event => setNewToDoTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addTodo(event);
                }
              }}
            />
          </form>
        </header>

        <section className="main">

          {shouldToddleAllBeVisible() && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={active.length === 0}
                onChange={() => {
                  if (active.length === 0) {
                    changeAllTodosStatus(false);
                  } else {
                    changeAllTodosStatus(true);
                  }
                }}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )}

          <ToDoList
            toDosToShow={toDosToShow()}
          />

        </section>
        {todos.length > 0 && (
          <Footer
            filters={filters}
            todos={todos}
            setTodos={setTodos}
            active={active}
            statusToShow={statusToShow}
            setStatusToShow={setStatusToShow}
          />
        )}
      </section>

    </Context.Provider>
  );
}
