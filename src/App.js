import React, { useState, useEffect, useMemo } from 'react';

import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

import { FILTERS } from './api/FILTERS';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [areAllToggled, setTogglingAll] = useState(false);
  const [choosenFilter, setChoosenFilter] = useState(FILTERS.all);

  useEffect(() => {
    !localStorage.todos
      ? localStorage.setItem('todos', JSON.stringify([]))
      : setTodos(JSON.parse(localStorage.getItem('todos')));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();

    if (!todoTitle) {
      return;
    }

    setTodos(prevTodos => ([
      ...prevTodos,
      {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      },
    ]));

    setTodoTitle('');
  };

  const deleteTodo = (todoId) => {
    const newTodos = [...todos].filter(todo => todo.id !== todoId);

    setTodos(newTodos);
  };

  const changeCompleteness = (todoId) => {
    const newTodoList = [...todos].map(
      (todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      },
    );

    setTodos(newTodoList);
  };

  const togglingAll = () => {
    if (!areAllToggled) {
      return setTodos([...todos].map(
        todo => ({
          ...todo,
          completed: true,
        }),
      ));
    }

    return setTodos([...todos].map(
      todo => ({
        ...todo,
        completed: false,
      }),
    ));
  };

  const clearCompleted = () => {
    setTodos(
      [...todos].filter(todo => todo.completed === false),
    );
    setTogglingAll(false);
  };

  const filteredTodos = useMemo(() => {
    switch (choosenFilter) {
      case FILTERS.active:
        return todos.filter(todo => !todo.completed);
      case FILTERS.completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, choosenFilter]);

  const changeTodoTitle = (todoId, newTitle) => setTodos([...todos].map(
    (todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    },
  ));

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form
          onSubmit={addTodo}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={event => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={areAllToggled}
          onChange={() => {
            setTogglingAll(!areAllToggled);
            togglingAll();
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          changeCompleteness={changeCompleteness}
          changeTodoTitle={changeTodoTitle}
        />
      </section>

      {todos.length === 0
        ? null
        : (
          <footer className="footer">
            <span className="todo-count">
              {todos.filter(todo => !todo.completed).length}
              {todos.filter(todo => !todo.completed).length === 1
                ? ' item left'
                : ' items left'}
            </span>

            <TodosFilter
              choosenFilter={choosenFilter}
              setChoosenFilter={setChoosenFilter}
            />

            {todos.some(todo => todo.completed === true) && (
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
};

export default App;
