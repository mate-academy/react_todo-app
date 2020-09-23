import React, { useState } from 'react';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [allCompleted, setAllcompleted] = useState(false);

  const todoAddition = (event) => {
    if (!todoTitle) {
      return;
    }

    setTodos(prevTodos => [...prevTodos,
      {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      },
    ]);
    setTodoTitle('');
  };

  const checkAllCompleted = () => {
    setAllcompleted(!allCompleted);

    setTodos(todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    })));
  };

  return (
    <section className="todoApp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          todoAddition(e);
        }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={({ target }) => setTodoTitle(target.value.trimLeft())}
          />
        </form>
      </header>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={false}
          onChange={() => checkAllCompleted()}
        />
        <label htmlFor="toggle-all">Mark all as completed</label>
        <TodoList todos={todos} setTodos={setTodos} />
      </section>
    </section>
  );
};
