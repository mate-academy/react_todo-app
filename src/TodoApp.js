import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { DispatchContext, TodosContext } from './context/TodosContext';
import { actions } from './context/reducer';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { UserInfo } from './components/UserInfo';
import { FILTERS, USER_ID } from './constants';
import { getUser, getUserTodos } from './api';

function TodoApp() {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [user, setUser] = useState({});

  const { pathname } = useLocation();

  const filteredTodos = useMemo(
    () => (
      todos.filter(({ completed }) => {
        switch (pathname) {
          case FILTERS.active:
            return !completed;

          case FILTERS.completed:
            return completed;

          case FILTERS.all:
          default:
            return true;
        }
      })
    )
    , [todos, pathname],
  );

  const toggleAllChecked = useMemo(() => (
    todos.every(({ completed }) => completed)
  ), [todos]);

  useEffect(() => {
    getUser(USER_ID)
      .then(setUser);

    getUserTodos(USER_ID)
      .then(userTodos => dispatch(actions.reset(userTodos)))
      .catch(error => alert(error));
  }, []);

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo />
        </header>

        <TodoList
          todos={filteredTodos}
          toggleAllChecked={toggleAllChecked}
        />

        {todos.length > 0 && (
          <TodoFooter todos={filteredTodos} />
        )}
      </section>

      <UserInfo name={user.name} />
    </>
  );
}

export default TodoApp;
