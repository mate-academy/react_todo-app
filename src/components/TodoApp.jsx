import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { TodoList } from './TodoList';
import { addNewTodo } from '../api/api';
import { changeTodo } from '../api/api';

export const TodoApp = ({ todos, updateTodos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [error, setError] = useState(false);
  const [allChecked, setAllChecked] = useState(todos && todos.every(
    todo => todo.completed === true
  ));

  useEffect(() => {
    setAllChecked(todos && todos.every(todo => todo.completed === true));
  }, [todos]);

  const handleChange = ({ target }) => {
    setNewTodoTitle(target.value);
    setError(false);
  };

  const newTodo = async(e) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      return setError(true);
    }

    const newTodoObj = {
      "userId": 1233,
      "completed": false,
      "title": newTodoTitle,
    };

    setNewTodoTitle('');
    await addNewTodo(newTodoObj);
    updateTodos();
  };

  const toggleAll = async() => {
    await Promise.all(todos.map((todo) => {
      return changeTodo(todo.id, { completed: !allChecked });
    }));
    updateTodos();
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={newTodo}>
          <input
            type="text"
            className={`new-todo ${error && 'error'}`}
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleChange}
          />
        </form>
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
            <TodoList todos={todos} updateTodos={updateTodos} />
          </Route>
          <Route path="/active" exact>
            <TodoList
              todos={todos.filter(todo => todo.completed === false)}
              updateTodos={updateTodos}
            />
          </Route>
          <Route path="/completed" exact>
            <TodoList
              todos={todos.filter(todo => todo.completed === true)}
              updateTodos={updateTodos}
            />
          </Route>
        </Switch>
        )}
      </section>
    </>
  );
};
