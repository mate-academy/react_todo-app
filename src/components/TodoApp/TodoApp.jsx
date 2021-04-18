import React, { useState } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodoFilter } from '../TodoFilter/TodoFilter';

export const TodoApp = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  const toggleAllTodos = () => {
    let filteredTodos;

    if (todos.some(todo => todo.completed === false)) {
      filteredTodos
        = todos.map(todo => ({
          ...todo,
          completed: true,
        }));
    } else {
      filteredTodos
        = todos.map(todo => ({
          ...todo,
          completed: false,
        }));
    }

    setTodos(filteredTodos);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addTodo(title);
    setTitle('');
  };

  const addTodo = (newtitle) => {
    if (newtitle !== '') {
      const newTodo = {
        id: +new Date(),
        title: newtitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (todoId) => {
    setTodos(prevTodos => prevTodos.filter(
      todo => todo.id !== todoId,
    ));
  };

  const toggleTodoComplete = (todo) => {
    const selectedTodo = todos.find(item => todo.id === item.id);

    selectedTodo.completed = !selectedTodo.completed;
    setTodos([...todos]);
  };

  const clearCompletedTodos = () => {
    setTodos(prevTodos => prevTodos.filter(
      todo => todo.completed !== true,
    ));
  };

  console.log(todos);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleInputChange}
        />
      </form>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggleAllTodos}
        />
        <label htmlFor="toggle-all">Mark all as completed</label>
      </section>

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodoComplete={toggleTodoComplete}
      />

      <footer className="footer">
        <span className="todo-count">
          {todos.filter(todo => !todo.completed).length}
          {' '}
          items left
        </span>
        <TodoFilter todos={todos} />
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTodos}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
