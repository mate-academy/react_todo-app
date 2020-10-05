import React, { useState, useMemo } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Context } from './context';
import { AddTodo } from './components/AddTodo/AddTodo';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('ALL');

  // useEffect(() => {
  //   fetch('https://mate-api.herokuapp.com/todos')
  //     .then(response => response.json)
  //     .then(todos => {
  //       setTodos(todos.data)
  //     })
  // }, [])

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    }));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = (title) => {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]));
  };

  const shownTodos = useMemo(() => todos.filter((todo) => {
    switch (filter) {
      case 'ACTIVE':
        return !todo.completed;
      case 'COMPLETED':
        return todo.completed;
      default:
        return todo;
    }
  }), [filter, todos]);

  const changeTodo = (id, title) => {
    setTodos(todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, title };
    }));
  };

  return (
    <Context.Provider value={{ removeTodo, toggleTodo, changeTodo }}>
      <section className="todoapp">
        <header className="header">
          <h1>todos App</h1>

          <AddTodo onCreate={addTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <TodoList todos={shownTodos} />
        </section>

        {todos.length !== 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {`${
                (todos.filter(todo => todo.completed === false)).length
              } items left`
              }
            </span>

            <TodosFilter setFilter={setFilter} />

            {(todos.filter(todo => todo.completed)).length > 0
              && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={() => {
                    setTodos(shownTodos.filter(todo => !todo.completed));
                  }}
                >
                  Clear completed
                </button>
              )
            }
          </footer>
        )
        }
      </section>
    </Context.Provider>
  );
}

export default App;
