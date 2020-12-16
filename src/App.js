import React, { useState, useCallback, useMemo } from 'react';

import { TodoList } from './components/TodoList';
import { useLocalStorage } from './custom_hooks/useLocalStorage';
import { AddTodoForm } from './components/AddTodoForm';
import { Footer } from './components/Footer';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterStatus, setFilterStatus] = useState('all');
  const [allCompleted, setAllCompleted] = useState(false);

  const toggleAll = (status) => {
    const changedStatusTodos = todos.map(todo => (
      {
        ...todo,
        completed: status,
      }
    ));

    setAllCompleted(status);
    setTodos(changedStatusTodos);
  };

  const changeStatus = (checkedTodoId) => {
    const todosCopy = todos.map((todo) => {
      if (todo.id === checkedTodoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(todosCopy);
  };

  const deleteTodo = (todoIdForDelete) => {
    const filteredList = todos.filter(todo => (
      todo.id !== todoIdForDelete
    ));

    setTodos(filteredList);
  };

  const clearAllCompleted = useCallback(() => {
    const filteredList = todos.filter(todo => !todo.completed);

    setTodos(filteredList);

    if (filterStatus === 'completed') {
      setFilterStatus('all');
    }
  }, [filterStatus, setTodos, todos]);

  const updateTodoItem = useCallback((todoId, newTitle) => {
    const todosCopy = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    });

    setTodos(todosCopy);
  }, [setTodos, todos]);

  const completedTodos = useMemo(() => (
    todos.filter(todo => (
      todo.completed
    ))
  ), [todos]);

  const uncompletedTodos = useMemo(() => (
    todos.filter(todo => (
      !todo.completed
    ))
  ), [todos]);

  const filteredTodos = useMemo(() => {
    if (filterStatus === 'all') {
      return todos;
    }

    const filter = filterStatus === 'completed';
    const filteredList = todos.filter(todo => (
      todo.completed === filter
    ));

    return filteredList;
  }, [todos, filterStatus]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm
          todos={todos}
          setTodos={setTodos}
        />
      </header>
      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={allCompleted}
              onChange={event => toggleAll(event.target.checked)}
            />
            <label
              htmlFor="toggle-all"
              title="Mark all as completed/not completed"
            >
              Mark all as completed/not completed
            </label>

            <TodoList
              todos={filteredTodos}
              changeStatus={changeStatus}
              deleteTodo={deleteTodo}
              toggleAll={toggleAll}
              updateTodoItem={updateTodoItem}
            />
          </section>

          <Footer
            uncompletedTodos={uncompletedTodos.length}
            completedTodosQty={completedTodos.length}
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
            clearAllCompleted={clearAllCompleted}
          />
        </>
      )}
    </section>
  );
}

export default App;
