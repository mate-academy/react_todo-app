import React, { useState, useCallback, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { useLocalStorage } from './helpers/useLocalStorage';

import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [storageTodos, setStorageTodos] = useLocalStorage('todos', todos);

  const onCreate = useCallback(
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

  const onComplete = useCallback(
    (id) => {
      const newTodos = todos.map(todo => (todo.id === id ? ({
        ...todo,
        completed: !todo.completed,
      })
        : todo));

      setTodos(newTodos);
    }, [todos],
  );

  const onToggle = useCallback(
    (completed) => {
      const newTodos = todos.map(todo => ({
        ...todo,
        completed: !completed,
      }));

      setTodos(newTodos);
    }, [todos],
  );

  const onRemove = useCallback(
    (id) => {
      const newTodos = todos.filter(todo => todo.id !== id);

      setTodos(newTodos);
    }, [todos],
  );

  const onRemoveCompleted = useCallback(
    () => {
      const newTodos = todos.filter(todo => !todo.completed);

      setTodos(newTodos);
    }, [todos],
  );

  return (
    <section className="todoapp">
      <TodoInput onCreate={onCreate} />
      <section className="main">

        <Switch>
          {todos.length > 0
            && (
              <TodoList
                todos={storageTodos}
                onComplete={onComplete}
                onToggle={onToggle}
                onRemove={onRemove}
              />
            )}
          <Redirect to={TodoList.link({ status: 'all' })} />
        </Switch>
      </section>

      {todos.length > 0
        && (
          <TodoFilter
            todos={storageTodos}
            onRemoveCompleted={onRemoveCompleted}
          />
        )}
    </section>
  );
}

export default TodoApp;
