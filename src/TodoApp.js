import React, { useState, useEffect, useMemo, useContext } from 'react';

import { DispatchContext, TodosContext } from './context/TodosContext';
import { actions } from './context/reducer';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { UserInfo } from './components/UserInfo';
import { USER_ID } from './constants';
import { getUser, getUserTodos, deleteTodo } from './api';

function TodoApp() {
  const todos = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(USER_ID)
      .then(setUser)
      .catch(error => alert(`Failed to fetch user data; ${error}`));

    getUserTodos(USER_ID)
      .then(userTodos => dispatch(actions.reset(userTodos)))
      .catch(error => alert(`Failed to fetch todo list; ${error}`));
  }, []);

  const [activeCount, completedCount] = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const active = todos.length - completed;

    return [active, completed];
  }, [todos]);

  const handleDeleteCompleted = async() => {
    const results = await Promise.allSettled(
      todos.filter(todo => todo.completed)
        .map(todo => deleteTodo(todo.id)),
    );

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        dispatch(actions.delete(result.value.id));
      } else {
        alert(`Failed to delete item`);
      }
    });
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo />
        </header>

        <TodoList />

        {todos.length > 0 && (
          <TodoFooter
            activeCount={activeCount}
            completedCount={completedCount}
            handleDeleteCompleted={handleDeleteCompleted}
          />
        )}
      </section>

      <UserInfo name={user.name} />
    </>
  );
}

export default TodoApp;
