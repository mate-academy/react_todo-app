import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

// DELETE INITIAL TODO?
// const initialTodos = [{
//   completed: false, id: 'yqpsi41da', title: '1212123',
// }, {
//   completed: false, id: '3wonnlkkn', title: 'xcvnslk',
// }, { completed: false, id: 'i0b54y3z9', title: '-9adsf0' },
// ];

// DEBOUNCE
// const debounce = (f, delay) => {
//   let timerId;

//   return (...args) => {
//     clearTimeout(timerId);
//     timerId = setTimeout(f, delay, ...args);
//   };
// };

function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setfilteredTodos] = useState(todos);
  const [filterStatus, setFilterStatus] = useState('');
  const [activeSelectAll, setActiveSelectAll] = useState(false);

  const addTodo = (value) => {
    setTitle(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newTodo = {
      title,
      id: Math.random().toString(36).substr(2, 9),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setfilteredTodos([...todos, newTodo]);

    setTitle('');
  };

  const toggleAll = () => {
    const uncheckedTodos = todos.map(todo => (
      {
        ...todo,
        completed: false,
      }
    ));

    setTodos(uncheckedTodos);
    setfilteredTodos(uncheckedTodos);
  };

  const changeStatus = (checkedTodoId) => {
    const checkedTodo = todos.find(todo => (
      todo.id === checkedTodoId
    ));
    const index = todos.indexOf(checkedTodo);
    const todosCopy = [...todos];

    checkedTodo.completed = !checkedTodo.completed;

    todosCopy.splice(index, 1, checkedTodo);

    setTodos(todosCopy);
    setfilteredTodos(todosCopy);
  };

  useEffect(() => {
    if (filterStatus === 'all' || filterStatus === '') {
      setfilteredTodos(todos);
    } else {
      const filter = filterStatus === 'completed';

      const filteredList = todos.filter(todo => (
        todo.completed === filter
      ));

      setfilteredTodos(filteredList);
    }
  }, [filterStatus, todos]);

  const deleteTodo = (todoIdForDelete) => {
    const filteredList = todos.filter(todo => (
      todo.id !== todoIdForDelete
    ));

    setTodos(filteredList);
    setfilteredTodos(filteredList);
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
  }, [todos]);

  const clearAllCompleted = () => {
    const fileredList = todos.filter(todo => (
      todo.completed === false
    ));

    setTodos(fileredList);
    setfilteredTodos(fileredList);

    if (filterStatus === 'completed') {
      setFilterStatus('all');
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => addTodo(event.target.value)}
          />
        </form>
      </header>
      {!!todos.length && (
        <>
          <TodoList
            todos={filteredTodos}
            changeStatus={changeStatus}
            deleteTodo={deleteTodo}
            forToggleAll={toggleAll}
          />

          <footer className="footer">
            {filteredTodos.length !== 0 && (
              <span className="todo-count">
                {`${filteredTodos.length} item(s) left`}
              </span>
            )}

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={classNames({ selected: filterStatus === 'all' })}
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={classNames({
                    selected: filterStatus === 'active',
                  })}
                  onClick={() => setFilterStatus('active')}
                >
                  Active
                </a>
              </li>

              {activeSelectAll && (
                <li>
                  <a
                    href="#/completed"
                    className={classNames({
                      selected: filterStatus === 'completed',
                    })}
                    onClick={() => setFilterStatus('completed')}
                  >
                    Completed
                  </a>
                </li>
              )}

            </ul>

            {activeSelectAll && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearAllCompleted}
              >
                Clear completed
              </button>
            )}

          </footer>
        </>
      )}

    </section>
  );
}

export default App;
