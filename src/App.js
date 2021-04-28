import React, { useState, useEffect, useCallback } from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem('todos')) || [],
  );
  const [isAllChecked, setAllChecked] = useState(false);

  const onAdd = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteCompletedTodos = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
  }, [setTodos]);

  const handleStatus = useCallback((id) => {
    const completedTodo = todos.find(item => item.id === id);

    completedTodo.completed = !completedTodo.completed;
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEditChanges = (id, title) => {
    const changedTodo = todos.find(item => item.id === id);

    changedTodo.title = title;
    window.localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleClearing = () => {
    const newTodos = todos.filter(item => item.completed !== true);

    setTodos(newTodos);
  };

  const setAllCompleted = () => {
    const newTodos = todos.map((item) => {
      const { title, id } = item;
      let note = {};

      if (!isAllChecked) {
        note = { title, id, completed: true };
      } else {
        note = { title, id, completed: false };
      }

      return note;
    });

    setAllChecked(!isAllChecked);

    setTodos(newTodos);
  };

  return (
    <section className="todoapp">
      <TodoApp onAdd={onAdd} />

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onClick={setAllCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          handleEditChanges={handleEditChanges}
          todos={todos}
          handleClearing={handleClearing}
          onDelete={deleteCompletedTodos}
          onChange={handleStatus}
        />
      </section>

    </section>
  );
}

export default App;
