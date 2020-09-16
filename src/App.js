import React, { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [toggleAll, setToggleAll] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const newTodo = {
    id: +new Date(),
    title,
    completed: false,
  };

  useEffect(() => setToggleAll(todoList.every(todo => todo.completed)),
    [todoList]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            title
            && setTodoList([
              newTodo,
              ...todoList,
            ]);
            setTitle('');
            setToggleAll(todoList.some(todo => !todo.completed));
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title.trimLeft()}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={toggleAll}
          onChange={() => {
            setToggleAll(!toggleAll);
            todoList.map((todo, index) => {
              todoList[index].completed = !toggleAll;

              return { ...todo };
            });
            setTodoList([...todoList]);
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {todoList.map((todo, index) => (
            <li
              key={todo.id}
              className={todo.completed ? 'completed' : undefined}
            >
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={todoList[index].completed}
                  onChange={() => {
                    todoList[index].completed = !todoList[index].completed;
                    setTodoList([...todoList]);
                  }}
                />
                <label>{todo.title}</label>
                <button
                  type="button"
                  className="destroy"
                  onClick={() => {
                    todoList.splice(index, 1);
                    setTodoList([...todoList]);
                  }}
                />
              </div>
              <input type="text" className="edit" />
            </li>
          ))}
          <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>asdfghj</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="completed">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>qwertyuio</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>zxcvbnm</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>1234567890</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          {todoList.filter(todo => !todo.completed).length}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
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
