import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

// DELETE INITIAL TODO?
// const initialTodos = [{
//   completed: false, id: 'yqpsi41da', title: '1212123',
// }, {
//   completed: false, id: '3wonnlkkn', title: 'xcvnslk',
// }, { completed: false, id: 'i0b54y3z9', title: '-9adsf0' },
// ];

function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  // const [filterStatus, setFilterStatus] = useState(['']);

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

    setTodos(prevTodos => (
      [...prevTodos, newTodo]
    ));
    setTitle('');
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
  };

  // const addFilterStatus = useCallback((value) => {
  //   setFilterStatus(value);
  // }, []);

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
      {todos.length !== 0 && (
        <>
          <TodoList
            todos={todos}
            changeStatus={changeStatus}
          />

          <footer className="footer">
            {todos.length !== 0 && (
              <span className="todo-count">
                {`${todos.length} item(s) left`}
              </span>
            )}

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className="selected"
                // onClick={addFilterStatus('All')}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                >
                  Completed
                </a>
              </li>
            </ul>

            <button type="button" className="clear-completed">
              Clear completed
            </button>

          </footer>
        </>
      )}
    </section>
  );
}

export default App;
