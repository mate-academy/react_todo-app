import React, { useState, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';
import { Context } from './context';

export function App() {
  const [listOfToDos, setListOfToDos] = useState([]);
  const [toDosToShow, setToDosToShow] = useState(listOfToDos);
  const [notCompletedToDos, setNotCompletedToDos] = useState([]);
  const [newToDoTitle, setNewToDoTitle] = useState('');
  const [statusToShow, setStatusToShow] = useState('all');

  useEffect(() => {
    setNotCompletedToDos(
      listOfToDos.filter(todo => todo.completed === false),
    );

    setToDosToShow(listOfToDos);
  }, [listOfToDos]);

  function addTodo(event) {
    if (newToDoTitle.trim().length > 0) {
      setListOfToDos(prevState => [
        ...listOfToDos,
        { title: newToDoTitle, id: +new Date(), completed: false },
      ]);
      setNewToDoTitle('');
    }
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

  const filterTodosByStatus = (statusToFilterBy) => {
    if (statusToFilterBy === undefined) {
      setToDosToShow(listOfToDos);
      setStatusToShow('all');
    } else {
      setToDosToShow(listOfToDos.filter(
        todo => todo.completed === statusToFilterBy,
      ));
      if (statusToFilterBy) {
        setStatusToShow('completed');
      } else {
        setStatusToShow('active');
      }
    }
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
                if (event.key === 'Enter') {
                  event.preventDefault();
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
                checked={notCompletedToDos.length === 0}
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
            toDosToShow={toDosToShow}
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
                <a
                  href="#/"
                  className={statusToShow === 'all' ? 'selected' : ''}
                  onClick={() => filterTodosByStatus()}
                  onKeyDown={(event) => {
                    event.preventDefault();
                    filterTodosByStatus(true);
                  }}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={
                    (statusToShow === 'active'
                      && notCompletedToDos.length > 0
                    )
                      ? 'selected'
                      : ''
                  }
                  onClick={() => filterTodosByStatus(false)}
                  onKeyDown={(event) => {
                    event.preventDefault();
                    filterTodosByStatus(true);
                  }}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={
                    (statusToShow === 'completed'
                      && notCompletedToDos.length !== listOfToDos.length
                    )
                      ? 'selected'
                      : ''
                  }
                  onClick={() => filterTodosByStatus(true)}
                  onKeyDown={(event) => {
                    event.preventDefault();
                    filterTodosByStatus(true);
                  }}
                >
                  Completed
                </a>
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
