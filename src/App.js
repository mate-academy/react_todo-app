import React, { useState, useEffect } from 'react';
import { ToDoList } from './components/ToDoList';
import { Footer } from './components/Footer';
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

    if (statusToShow !== 'all') {
      if (statusToSet) {
        setStatusToShow('completed');
      } else {
        setStatusToShow('active');
      }
    }
  };

  useEffect(() => {
    if (statusToShow === 'all') {
      setToDosToShow(listOfToDos);
    } else if (statusToShow === 'active') {
      setToDosToShow(listOfToDos.filter(
        todo => todo.completed === false,
      ));
    } else {
      setToDosToShow(listOfToDos.filter(
        todo => todo.completed === true,
      ));
    }
  }, [statusToShow, listOfToDos]);

  const removeTodo = (todoId) => {
    setListOfToDos(listOfToDos.filter(todo => todo.id !== todoId));
  };

  return (
    <Context.Provider
      value={{
        changeTodoStatus,
        removeTodo,
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
          <Footer
            listOfToDos={listOfToDos}
            setListOfToDos={setListOfToDos}
            notCompletedToDos={notCompletedToDos}
            statusToShow={statusToShow}
            setStatusToShow={setStatusToShow}
          />
        )}
      </section>

    </Context.Provider>
  );
}
