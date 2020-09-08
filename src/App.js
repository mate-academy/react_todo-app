import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

function App() {
  const [todoList, setTodoList] = useState([]);
  let displayedList = todoList;
  const [filter, setFilter] = useState('All');

  if (filter === 'All') {
    displayedList = todoList;
  } else if (filter === 'Active') {
    displayedList = todoList.filter(todo => todo.isActive);
  } else if (filter === 'Completed') {
    displayedList = todoList.filter(todo => !todo.isActive);
  }

  function addTodo(target) {
    if (target.value.trim().length > 0) {
      setTodoList([
        ...todoList,
        {
          title: target.value,
          id: todoList.length,
          isActive: true,
        },
      ]);
      const input = target;

      input.value = '';
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              addTodo(event.target);
            }
          }}
        />
      </header>

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          displayedList={displayedList}
          setTodoList={setTodoList}
          todoList={todoList}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {todoList.length.concat(' ')}
          items left
        </span>
        <TodoFilter
          setFilter={setFilter}
          setTodoList={setTodoList}
          todoList={todoList}
        />
      </footer>
    </section>
  );
}

export default App;
