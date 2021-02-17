import React, { useState, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';
import { Accept } from './components/Accept';
import { Footer } from './components/Footer';
import { Context } from './context';

export function App() {
  const [todos, setTodos] = useState([]);

  const filters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
  };

  const [statusToShow, setStatusToShow] = useState(filters.All);
  const [newTitle, setNewToDoTitle] = useState('');
  const [isAcceptVisible, setIsAcceptVisible] = useState(false);

  const active = todos.filter(todo => todo.completed === false);
  const completed = todos.filter(todo => todo.completed === true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function toDosToShow() {
    switch (statusToShow) {
      case filters.Completed:
        return completed;

      case filters.Active:
        return active;

      default:
        return todos;
    }
  }

  function addTodo(event) {
    if (newTitle.trim().length > 0) {
      setTodos([
        ...todos,
        { title: newTitle, id: +new Date(), completed: false },
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

        {isAcceptVisible && (
          <Accept
            setIsAcceptVisible={setIsAcceptVisible}
            changeAllTodosStatus={changeAllTodosStatus}
          />
        )}

        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTitle}
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

          {todos.length > 0 && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                checked={active.length === 0}
                onClick={() => setIsAcceptVisible(true)}
              />
              <label htmlFor="toggle-all">
                Mark all as complete
              </label>
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
