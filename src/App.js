import React, { useState, useEffect } from 'react';
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
  const [filterStatus, setFilterStatus] = useState('all');

  // console.log('App test');

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

  const changeStatus = (checkedTodoId) => {
    if (checkedTodoId === 'all') {
      const uncheckedTodos = todos.map(todo => (
        {
          ...todo,
          completed: false,
        }
      ));

      setTodos(uncheckedTodos);
      setfilteredTodos(uncheckedTodos);

      return;
    }

    const checkedTodo = todos.find(todo => (
      todo.id === checkedTodoId
    ));
    const index = todos.indexOf(checkedTodo);
    const todosCopy = [...todos];

    checkedTodo.completed = !checkedTodo.completed;

    todosCopy.splice(index, 1, checkedTodo);

    setTodos(todosCopy);
  };

  useEffect(() => {
    if (filterStatus === 'all') {
      setfilteredTodos(todos);
    } else {
      const filter = filterStatus === 'completed';

      const filteredList = todos.filter(todo => (
        todo.completed === filter
      ));

      setfilteredTodos(filteredList);
    }
  }, [filterStatus, todos]);

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
      {!!filteredTodos.length && (
        <TodoList
          todos={filteredTodos}
          changeStatus={changeStatus}
        />
      )}

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
              className="selected"
              onClick={() => setFilterStatus('all')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={() => setFilterStatus('active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>

      </footer>
    </section>
  );
}

export default App;
