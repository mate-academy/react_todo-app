import React, { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [uneditedTitles, setUneditedTitles] = useState({});
  const [toggleAll, setToggleAll] = useState(true);
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.list) || []);
  const [filter, setFilter] = useState('All');
  const filteredList = todoList.filter((todo) => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });
  const newTodo = {
    id: +new Date(),
    title,
    completed: false,
  };

  localStorage.list = JSON.stringify(todoList);

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
        <label
          htmlFor="toggle-all"
          hidden={!todoList.length}
        >
          Mark all as complete
        </label>

        <ul className="todo-list">
          {filteredList.map((todo, index) => (
            <li
              hidden={todo.hidden}
              key={todo.id}
              className={todo.completed ? 'completed' : undefined}
              onDoubleClick={(event) => {
                const clickedTodo = event.target;

                setUneditedTitles({
                  ...uneditedTitles,
                  [todo.id]: todo.title,
                });
                clickedTodo.closest('li').className = 'editing';
              }}
            >
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={todo.completed}
                  onChange={() => {
                    todoList[index].completed = !todo.completed;
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
              <input
                type="text"
                className="edit"
                value={todo.title}
                onChange={(event) => {
                  todoList[index].title = event.target.value;
                  setTodoList([...todoList]);
                }}
                onKeyDown={(event) => {
                  const clickedTodo = event.target;

                  if (event.key === 'Enter') {
                    clickedTodo.closest('li').className
                      = todo.completed ? 'completed' : '';
                  }

                  if (event.key === 'Escape') {
                    todoList[index].title = uneditedTitles[todo.id];
                    setTodoList([...todoList]);
                    clickedTodo.closest('li').className
                      = todo.completed ? 'completed' : '';
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </section>

      <footer
        className="footer"
        hidden={!todoList.length}
      >
        <span className="todo-count">
          {todoList.filter(todo => !todo.completed).length}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={filter === 'All' ? 'selected' : ''}
              onClick={() => setFilter('All')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={filter === 'Active' ? 'selected' : ''}
              onClick={() => setFilter('Active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={filter === 'Completed' ? 'selected' : ''}
              onClick={() => setFilter('Completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          hidden={todoList.every(todo => !todo.completed)}
          className="clear-completed"
          onClick={() => setTodoList(
            [...todoList.filter(todo => !todo.completed)],
          )}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
