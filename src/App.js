import React, { useState, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';
import { Context } from './context';

function App() {
  const [listOfToDos, setListOfToDos] = useState([]);
  const [notCompletedToDos, setNotCompletedToDos] = useState([]);
  const [newToDoTitle, setNewToDoTitle] = useState('');

  useEffect(() => {
    setNotCompletedToDos(
      listOfToDos.filter(todo => todo.completed === false),
    );
  }, [listOfToDos]);

  function addTodo(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setListOfToDos(prevState => [
        ...listOfToDos,
        { title: newToDoTitle, id: +new Date(), completed: false },
      ]);
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
                addTodo(event);
              }}
            />
          </form>
        </header>

        <section className="main">

          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ToDoList
            listOfToDos={listOfToDos}
          />

        </section>

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

          <button
            type="button"
            className="clear-completed"
            onClick={() => setListOfToDos(notCompletedToDos)}
          >
            Clear completed
          </button>
        </footer>
      </section>
    </Context.Provider>
  );
}

export default App;
