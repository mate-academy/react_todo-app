import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { TodoList } from './TodoList';
import { changeTodo } from '../api/api';
import { NewTodoForm } from './NewTodoForm';

export const TodoApp = ({ todos, setTodos }) => {
  const [allChecked, setAllChecked] = useState(todos && todos.every(
    todo => !!todo.completed
  ));

  useEffect(() => {
    setAllChecked(todos && todos.every(todo => !!todo.completed));
  }, [todos]);

  const toggleAll = async() => {
    await Promise.all(todos.map((todo) => {
      return changeTodo(todo.id, { completed: !allChecked });
    }));

    setTodos(list => list.map(todo => ({
      ...todo,
      completed: !allChecked,
    })));
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <NewTodoForm setTodos={setTodos} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggleAll}
          checked={allChecked}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos && (
        <Switch>
          <Route path="/" exact>
            <TodoList todos={todos} setTodos={setTodos} />
          </Route>
          <Route path="/active" exact>
            <TodoList
              todos={todos.filter(todo => !todo.completed)}
              setTodos={setTodos}
            />
          </Route>
          <Route path="/completed" exact>
            <TodoList
              todos={todos.filter(todo => !!todo.completed)}
              setTodos={setTodos}
            />
          </Route>
        </Switch>
        )}
      </section>
    </>
  );
};
