/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Route, Routes } from 'react-router-dom';

import AddTodoForm from './components/AddTodoForm';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Hello404 from './components/Hello404';

import { getUser } from './api/users';
import {
  deleteTodo,
  getTodos,
  postTodo,
  updateTodo,
} from './api/todos';

import { Todo, TodoPropsToUpdate } from './types/todo';
import { User } from './types/user';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    Promise.all([getUser(), getTodos()])
      .then(responce => {
        const [userFromServer, todosFromServer] = responce;

        setUser(userFromServer);
        setTodos(todosFromServer);
      });
  }, []);

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  const onTodoAdd = useCallback(async (newTodo: Todo) => {
    const addedTodo = await postTodo(newTodo);

    setTodos([...todos, addedTodo]);
  }, [todos]);

  const onTodoUpdate = useCallback(async (todoId: number, propsToUpdate: TodoPropsToUpdate) => {
    await updateTodo(todoId, propsToUpdate);

    setTodos((oldTodos) => oldTodos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, ...propsToUpdate };
      }

      return todo;
    }));
  }, [todos]);

  const onTodoDelete = useCallback(async (todoId: number) => {
    await deleteTodo(todoId);

    setTodos((oldTodos) => oldTodos.filter(todo => todo.id !== todoId));
  }, [todos]);

  const onToggleAllChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      todos.forEach(todo => {
        onTodoUpdate(todo.id, { completed: true });
      });
    } else {
      todos.forEach(todo => {
        onTodoUpdate(todo.id, { completed: false });
      });
    }
  }, [todos]);

  const clearCompleted = useCallback(async () => {
    todos.forEach(todo => {
      if (todo.completed) {
        onTodoDelete(todo.id);
      }
    });
  }, [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>{`${user?.name || 'Loading...'} todos`}</h1>

        <AddTodoForm onTodoAdd={onTodoAdd} />
      </header>

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={todos.every(todo => todo.completed)}
              onChange={onToggleAllChange}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={(
              <TodoList
                todos={todos}
                onTodoDelete={onTodoDelete}
                onTodoUpdate={onTodoUpdate}
              />
            )}
          />
          <Route
            path="/active"
            element={(
              <TodoList
                todos={activeTodos}
                onTodoDelete={onTodoDelete}
                onTodoUpdate={onTodoUpdate}
              />
            )}
          />
          <Route
            path="/completed"
            element={(
              <TodoList
                todos={completedTodos}
                onTodoDelete={onTodoDelete}
                onTodoUpdate={onTodoUpdate}
              />
            )}
          />
          <Route
            path="*"
            element={<Hello404 />}
          />
        </Routes>
      </section>

      {todos.length > 0 && (
        <Footer
          clearCompleted={clearCompleted}
          activeTodosLength={activeTodos.length}
          completedTodosLength={completedTodos.length}
        />
      )}
    </section>
  );
};

export default App;
