import React, { useState, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';
import { Context } from './context';

export function App() {
  const [listOfToDos, setListOfToDos] = useState([]);
  const [notCompletedToDos, setNotCompletedToDos] = useState([]);
  const [newToDoTitle, setNewToDoTitle] = useState('');

  useEffect(() => {
    setNotCompletedToDos(
      listOfToDos.filter(todo => todo.completed === false),
    );
  }, [listOfToDos]);

  function addTodo(event) {
    event.preventDefault();
    setListOfToDos(prevState => [
      ...listOfToDos,
      { title: newToDoTitle, id: +new Date(), completed: false },
    ]);
    setNewToDoTitle('');
  }

  const changeTodoStatus = (todoId) => {
    setListOfToDos(listOfToDos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    }));
  };

  const changeAllTodosStatus = (statusToSet) => {
    setListOfToDos(listOfToDos.map(
      todo => ({ ...todo, completed: statusToSet }),
    ));
  };

  return (
    <Context.Provider
      value={{
        changeTodoStatus,
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
                if (event.key === 'Enter' && newToDoTitle.trim().length > 0) {
                  addTodo(event);
                }
              }}
            />
          </form>
        </header>

        <section className="main">

          {(
            (notCompletedToDos.length === 0
              && listOfToDos.length !== 0)
            || (notCompletedToDos.length === listOfToDos.length
                && listOfToDos.length !== 0)
          ) && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onChange={() => {
                  if (notCompletedToDos.length === 0) {
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
            listOfToDos={listOfToDos}
          />

        </section>

        {listOfToDos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {notCompletedToDos.length}
              {' '}
              items left
            </span>

            <ul className="filters">
              <li>
                <a href="#/" className="selected">All</a>
              </li>

              <li>
                <a href="#/active">Active</a>
              </li>

              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>

            {(notCompletedToDos.length !== listOfToDos.length) && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setListOfToDos(notCompletedToDos)}
              >
                Clear completed
              </button>
            )}

          </footer>
        )}

      </section>

    </Context.Provider>
  );
}
