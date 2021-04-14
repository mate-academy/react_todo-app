/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/hooks';

export function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [visbleTodos, setVsibleTodos] = useState([]);

  useEffect(() => {
    setVsibleTodos(todos);
  }, [todos]);

  const updateTodos = (newTodos) => {
    setTodos([...todos, newTodos]);
  };

  const updateTitle = (todoId, newTitle) => {
    const findPost = visbleTodos.find(todo => todo.id === todoId);

    findPost.title = newTitle;
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const changeCheckox = (todoId, newCheck) => {
    const updatedPost = todos.find(todo => todo.id === todoId);

    updatedPost.completed = newCheck;

    setTodos(todos.map(todo => todo));
  };

  const filterTodos = (todoComplete) => {
    if (todoComplete === undefined) {
      setVsibleTodos(todos);
    } else {
      setVsibleTodos(todos
        .filter(post => post.completed === todoComplete));
    }
  };

  const onlyActiveTodos = () => todos
    .filter(todo => todo.completed === false).length;

  const clearAllCompleted = () => {
    setTodos(todos.filter(todo => todo.completed !== true));
  };

  const setAllTodosCompleted = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: !todo.completed })));
  };

  return (
    <section className="todoapp">
      <Header
        onSubmit={updateTodos}
        todosLength={visbleTodos.length}
        newId={todos.length + 1}
      />

      <Main
        todos={visbleTodos}
        changeCheckBox={changeCheckox}
        onDelete={deleteTodo}
        onUpdateTitle={updateTitle}
        setAllTodosCompleted={setAllTodosCompleted}
      />

      {todos.length > 0 && (
        <Footer
          filterTodos={filterTodos}
          gettodosActiveTodosLength={onlyActiveTodos}
          clearAllCompleted={clearAllCompleted}
        />
      )}
    </section>
  );
}
