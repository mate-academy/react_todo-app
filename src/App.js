import React, { useState } from 'react';
import classNames from 'classnames';

const FILTERS = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

function App() {
  const [newTitle, setNewTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState(FILTERS.all);
  const [editedTitle, setEditedTitle] = useState('');
  const [editId, setEditId] = useState(0);
  const activeTodos = todos.filter(todo => !todo.completed);


  const onSubmit = (event) => {
    event.preventDefault();

    if (!newTitle) {
      return;
    }

    addTodo(newTitle);
    setNewTitle('');
  };

  const addTodo = (title) => {
    const todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, todo]);
  };

  const toggleTodo = (todoId) => {
    const callback = (todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    };

    const newTodos = todos.map(callback);

    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(activeTodos);
  };

  const toggleAll = () => {
    const completed = activeTodos.length !== 0;

    const newTodos = todos.map((todo) => {
      if (todo.completed === completed) {
        return todo;
      }

      return { ...todo, completed };
    });

    setTodos(newTodos);
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo=> todo.id !== todoId))
  }

  const filterTodos = (filterStatus) => {
    debugger;
    switch (filterStatus) {
      case FILTERS.active:
        return todos.filter(todo=> !todo.completed)
      case FILTERS.completed:
        return todos.filter(todo=> todo.completed);
      default:
        return todos;
    }
  }

  const changeTitle = (todoId, title) => {
    debugger;
    const newTodos = todos.map(todo => {
      if(todoId === todo.id) {
        todo.title = title;
      }

      return todo;
    })

    setTodos(newTodos);
  }

  const setChangedTitle = (event) => {
    event.preventDefault();
    if (!event.target.value) {
      return deleteTodo(editId);
    }

    if (event.key === 'Enter' || event.type === 'blur') {
      changeTitle(editId, editedTitle);

      return setEditId(0);
    }

    return setEditId(0);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form onSubmit={onSubmit}>
          <input
            value={newTitle}
            onChange={({ target }) => {
              setNewTitle(target.value);
            }}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={activeTodos.length === 0}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filterTodos(filterStatus).map(todo => (
              <li
                key={todo.id}
                className={classNames({
                  completed: todo.completed,
                  editing: editId === todo.id,
                })}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={todo.completed}
                    onChange={() => {
                      toggleTodo(todo.id);
                    }}
                  />
                  {editId !== todo.id && (<label
                    onDoubleClick={()=> {
                      setEditId(todo.id);
                      setEditedTitle(todo.title);
                    }}
                  >
                    {todo.title}
                  </label>)}
                  <button 
                    type="button"
                    className="destroy"
                    onClick={()=> deleteTodo(todo.id)}
                  />
                </div>
                {editId === todo.id && (
                <input
                  type="text"
                  className="edit"
                  autoFocus
                  value={editedTitle}
                  onChange={({target})=> setEditedTitle(target.value.trimLeft())}
                  onKeyDown={({target})=> changeTitle(todo.id, target.value.trimLeft())}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === 'Escape') {
                      setChangedTitle(event);
                    }
                  }
                  }
                  onBlur={setChangedTitle}
                />)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {activeTodos.length === 1
              ? `1 item left`
              : `${activeTodos.length} items left`
            }
          </span>

          <ul className="filters">
            <li>
              <a 
                href="#/"
                className={classNames({'selected': filterStatus === FILTERS.all})}
                onClick={()=> setFilterStatus(FILTERS.all)}
              >
                {FILTERS.all}
              </a>
            </li>

            <li>
            <a 
                href="#/"
                className={classNames({'selected': filterStatus === FILTERS.active})}
                onClick={()=> setFilterStatus(FILTERS.active)}
              >
                {FILTERS.active}
              </a>
            </li>

            <li>
              <a 
                href="#/"
                className={classNames({'selected': filterStatus === FILTERS.completed})}
                onClick={()=> setFilterStatus(FILTERS.completed)}
              >
                {FILTERS.completed}
              </a>
          </li>
        </ul>

          {todos.length > activeTodos.length && (
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
