import React, { useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { FILTERS } from './Const';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    if (!localStorage.todos) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      setTodos(JSON.parse(localStorage.getItem('todos')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todoTitle.trim().length > 0) {
      const newTodo = {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTodoTitle('');
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const onStatusChange = (todoId) => {
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

  const toggleAll = (event) => {
    const eventChecked = event.target.checked;

    setTodos(prevTodos => prevTodos.map(todo => (
      { ...todo, completed: eventChecked }
    )));
  };

  const filterTodos = (key) => {
    switch (key) {
      case FILTERS.Active:
        return activeTodos;

      case FILTERS.Completed:
        return completedTodos;

      default:
        return todos;
    }
  };

  const filteredTodos = filterTodos(FILTERS[selectedFilter]);

  const deleteTodo = (todoID) => {
    setTodos(todos.filter(todo => todo.id !== todoID));
  };

  const clearCompleted = () => {
    setTodos(activeTodos);
  };

  const updateTitle = (id, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todos,
          title,
        };
      }

      return todo;
    }));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => {
              setTodoTitle(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggleAll}
          checked={activeTodos.length === 0}
        />
        <label>Mark all as complete</label>
        <TodoList
          todos={filteredTodos}
          onStatusChange={onStatusChange}
          deleteTodo={deleteTodo}
          updateTitle={updateTitle}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {activeTodos.length}
            {' '}
            items left
          </span>

          <TodosFilter
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
          />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          )}

        </footer>
      )}
    </section>
  );
}

export default App;
