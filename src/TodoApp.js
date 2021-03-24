import React, { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './helpers/useLocalStorage';

import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [storageTodos, setStorageTodos] = useLocalStorage('todos', todos);

  const addTodo = useCallback(
    (title) => {
      setTodos(prevTodos => [...prevTodos, {
        completed: false,
        title,
        id: +new Date(),
      }]);
    }, [],
  );

  useEffect(() => {
    setStorageTodos(todos);
  }, [todos]);

  const completeTodo = useCallback(
    (id) => {
      const newTodos = [...todos].map(todo => (todo.id === id ? ({
        ...todo,
        completed: !todo.completed,
      })
        : todo));

      setTodos(newTodos);
    }, [todos],
  );

  const completeTodos = useCallback(
    () => {
      const isCompleted = todos.every(todo => todo.completed);

      if (!isCompleted) {
        const newTodos = [...todos].map(todo => ({
          ...todo,
          completed: true,
        }));

        setTodos(newTodos);
      } else {
        const newTodos = [...todos].map(todo => ({
          ...todo,
          completed: false,
        }));

        setTodos(newTodos);
      }
    }, [todos],
  );

  const removeTodo = useCallback(
    (id) => {
      const newTodos = [...todos].filter(todo => todo.id !== id);

      setTodos(newTodos);
    }, [todos],
  );

  const filterTodos = useCallback(
    (type) => {
      switch (type) {
        case 'active':
          setStorageTodos(todos.filter(todo => !todo.completed));
          break;

        case 'completed':
          setStorageTodos(todos.filter(todo => todo.completed));
          break;

        default:
          setStorageTodos(todos);
          break;
      }
    }, [todos],
  );

  const clearCompletedTodos = useCallback(
    () => {
      const newTodos = [...todos].filter(todo => !todo.completed);

      setTodos(newTodos);
    }, [todos],
  );

  return (
    <section className="todoapp">
      <TodoInput addTodo={addTodo} />
      <section className="main">
        {todos.length > 0
          && (
          <TodoList
            todos={storageTodos}
            completeTodo={completeTodo}
            completeTodos={completeTodos}
            removeTodo={removeTodo}
          />
          )}
        {/* <Switch>
          <Route path="/all">
            <TodoList todos={todos} />
          </Route>

          <Route path="/active">
            <TodoList
              todos={setStorageTodos(todos.filter(todo => !todo.completed))}
            />
          </Route>

          <Route path="/completed">
            <TodoList
              todos={setStorageTodos(todos.filter(todo => todo.completed))}
            />
          </Route>

        </Switch> */}
      </section>

      {todos.length > 0
        && (
          <TodoFilter
            todos={storageTodos}
            filterTodos={filterTodos}
            clearCompletedTodos={clearCompletedTodos}
          />
        )}
    </section>
  );
}

export default TodoApp;
