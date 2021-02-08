import React, { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { InputField } from './components/InputField';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { FILTERS } from './constants';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [allStatus, setAllStatus] = useState(false);
  const [filter, setFilter] = useState(FILTERS.all);

  const getFilteredTodos = (todosList) => {
    switch (filter) {
      case (FILTERS.active):
        return todosList.filter(todo => !todo.completed);

      case (FILTERS.completed):
        return todosList.filter(todo => todo.completed);

      default:
        return todosList;
    }
  };

  const filteredTodos = useMemo(() => getFilteredTodos(todos), [todos, filter]);

  const addNewTodo = (newTodo) => {
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  useEffect(() => {
    if (todos.every(todo => todo.completed)) {
      setAllStatus(true);
    } else {
      setAllStatus(false);
    }
  }, [todos]);

  const toggleCompletedStatus = (todoId) => {
    setTodos(prevTodos => prevTodos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const removeItem = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    if (allStatus) {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    }

    setAllStatus(!allStatus);
  };

  const handleEditingTodo = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isBeingEdited: true,
        };
      }

      return {
        ...todo,
        isBeingEdited: false,
      };
    }));
  };

  const handleEditedTodo = (todoId, title) => {
    if (title.trim()) {
      setTodos(todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            isBeingEdited: false,
            title,
          };
        }

        return todo;
      }));

      return todos;
    }

    return todos;
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <InputField addNewTodo={addNewTodo} />
      </header>

      <section className="main">
        {todos.length === 0 && (<></>)}
        {todos.length > 0 && (
          <>
            <input
              checked={allStatus}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={toggleAll}
              value={allStatus}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          filter={filter}
          handleEditedTodo={handleEditedTodo}
          handleEditingTodo={handleEditingTodo}
          removeItem={removeItem}
          checkTodo={toggleCompletedStatus}
          todos={filteredTodos}
        />
      </section>

      {(todos.length > 0) && (
        <Footer
          clearCompleted={clearCompleted}
          todos={todos}
          handleFilter={handleFilter}
        />
      )}
    </section>
  );
}

export default App;
