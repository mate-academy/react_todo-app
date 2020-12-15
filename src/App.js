import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList';
import { useLocalStorage } from './custom_hooks/useLocalStorage';
import { AddTodoForm } from './components/AddTodoForm';
import { Footer } from './components/Footer';

function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeSelectAll, setActiveSelectAll] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  const addTitle = (value) => {
    setTitle(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (title.length === 0) {
      return;
    }

    const newTodo = {
      title,
      id: uuidv4(),
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
  };

  const toggleAll = (status) => {
    const uncheckedTodos = todos.map(todo => (
      {
        ...todo,
        completed: status,
      }
    ));

    setAllCompleted(status);
    setTodos(uncheckedTodos);
  };

  useEffect(() => {
    if (todos.every(todo => todo.completed === true)) {
      setAllCompleted(true);
    }

    if (todos.every(todo => todo.completed === false)) {
      setAllCompleted(false);
    }
  }, [todos]);

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

  useEffect(() => {
    if (!activeSelectAll) {
      const checkStatus = todos.some(todo => (
        todo.completed === true
      ));

      if (checkStatus) {
        setActiveSelectAll(true);
      }
    } else {
      const checkStatus = todos.every(todo => (
        todo.completed === false
      ));

      if (checkStatus) {
        setActiveSelectAll(false);
      }
    }
  }, [todos, activeSelectAll]);

  const clearAllCompleted = useCallback(() => {
    const filteredList = todos.filter(todo => (
      todo.completed === false
    ));

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

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <AddTodoForm
          addTitle={addTitle}
          onSubmit={onSubmit}
          title={title}
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
              todos={todos}
              filterStatus={filterStatus}
              changeStatus={changeStatus}
              deleteTodo={deleteTodo}
              toggleAll={toggleAll}
              updateTodoItem={updateTodoItem}
            />
          </section>

          <Footer
            filteredTodos={todos}
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
            activeSelectAll={activeSelectAll}
            clearAllCompleted={clearAllCompleted}
          />
        </>
      )}
    </section>
  );
}

export default App;
