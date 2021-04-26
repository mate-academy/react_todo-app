import React, { useState, useEffect, useCallback } from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoList } from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem('todos')) || [],
  );
  const [todo, setTodo] = useState();
  const [isAllChecked, setAllChecked] = useState(false);

  useEffect(() => {
    if (todo) {
      setTodos(prevTodos => [...prevTodos, todo]);
    }
  }, [todo]);

  useEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const deleteCompletedTodos = useCallback((id) => {
    setTodos(newTodos => newTodos.filter(item => item.id !== id));
  }, []);

  const handleCheckbox = (id) => {
    const completedTodo = todos.find(item => item.id === id);

    completedTodo.completed = !completedTodo.completed;
    window.localStorage.setItem('todos', JSON.stringify(todos));
  };

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
      const note = item;

      if (!isAllChecked) {
        note.completed = true;
      } else {
        note.completed = false;
      }

      return note;
    });

    setAllChecked(!isAllChecked);

    setTodos(newTodos);
    window.localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
    <section className="todoapp">
      <TodoApp onAdd={setTodo} />

      <section className="main">
        {todos.length > 0
          && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onClick={setAllCompleted}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )
        }

        <TodoList
          handleEditChanges={handleEditChanges}
          todos={todos}
          handleClearing={handleClearing}
          onDelete={deleteCompletedTodos}
          onChange={handleCheckbox}
        />
      </section>

    </section>
  );
}

export default App;
