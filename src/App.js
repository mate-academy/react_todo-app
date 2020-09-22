import React, { useState, useMemo, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { FILTERS } from './components/constants';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState(FILTERS.all);

  useEffect(() => {
    if (localStorage.getItem('data')) {
      setTodos(JSON.parse(localStorage.getItem('data')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoToAdd) => {
    if (!todoToAdd.title) {
      return;
    }

    setTodos([...todos, todoToAdd]);
  };

  const changeTodo = (id, title) => {
    setTodos(todos.map((todo) => {
      if (title && todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

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

  const completedLenght = todos.filter(todo => !todo.completed).length;

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
              todos={todos}
              filteredTodos={filteredTodos}
              changeStatusAll={changeStatusAll}
              changeTodo={changeTodo}
              deleteTodo={deleteTodo}
            />

            <footer className="footer">
              <span className="todo-count">
                {completedLenght}
                {' '}
                {completedLenght === 1 ? 'item left' : 'items left'}
              </span>

              <TodoFilters
                filter={filter}
                setFilter={setFilter}
              />

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
