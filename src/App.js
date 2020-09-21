
import React, { useState, useMemo } from 'react';
import { TodoList } from './components/TodoList';

const App = () => {
  const FILTERS = { all: 'all', active: 'active', completed: 'completed' };
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState(FILTERS.all);

  const addTodo = (todoToAdd) => {
    setTodos([...todos, todoToAdd]);
  };

  const changeStatus = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const changeStatusAll = () => {
    if (todos.some(todo => !todo.completed)) {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    }
  };

  const changeFilter = (todosList, filters) => {
    switch (filters) {
      case FILTERS.active:
        return todosList.filter(item => !item.completed);

      case FILTERS.completed:
        return todosList.filter(item => item.completed);

      default:
        return todosList;
    }
  };

  const filteredTodos = useMemo(
    () => changeFilter(todos, filter),
    [todos, filter],
  );

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTodo({
              title: newTodo,
              id: +new Date(),
              completed: false,
            });
            setNewTodo('');
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(event) => {
              setNewTodo(event.target.value);
            }}
          />
        </form>
      </header>

      {todos.length > 0
        && (
          <>
            <TodoList
              filteredTodos={filteredTodos}
              changeStatusAll={changeStatusAll}
              changeStatus={changeStatus}
              deleteTodo={deleteTodo}
            />

            <footer className="footer">
              <span className="todo-count">
                {todos.filter(todo => !todo.completed).length}
                {' '}
                items left
              </span>

              <ul className="filters">
                <li>
                  <a
                    href="#/"
                    className={
                      filter === FILTERS.all ? 'selected' : ''
                    }
                    onClick={() => setFilter(FILTERS.all)
                    }
                  >
                    All
                  </a>
                </li>

                <li>
                  <a
                    href="#/active"
                    className={
                      filter === FILTERS.active ? 'selected' : ''
                    }
                    onClick={() => setFilter(FILTERS.active)
                    }
                  >
                    Active
                  </a>
                </li>

                <li>
                  <a
                    href="#/completed"
                    className={
                      filter === FILTERS.completed ? 'selected' : ''
                    }
                    onClick={() => setFilter(FILTERS.completed)
                    }
                  >
                    Completed
                  </a>
                </li>
              </ul>

              {todos.filter(todo => todo.completed).length > 0
              && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={() => deleteAllCompleted()}
                >
                  Clear completed
                </button>
              )
              }
            </footer>
          </>
        )
      }
    </section>
  );
};

export default App;
