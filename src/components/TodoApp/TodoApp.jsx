import React, { useState } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { useLocalStorage } from '../../styles/localStorage';

export const TodoApp = () => {
  const [title, setTitle] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [todos, setTodos] = useLocalStorage('todos', []);

  const switchFilter = (filter) => {
    let visibleTodos;

    switch (filter) {
      case 'Active':
        visibleTodos = todos.filter(todo => !todo.completed);
        break;

      case 'Completed':
        visibleTodos = todos.filter(todo => todo.completed);
        break;

      case 'All':
        visibleTodos = todos;
        break;

      default:
        visibleTodos = todos;
    }

    return visibleTodos;
  };

  const filterChange = (filter) => {
    setActiveFilter(filter);
    switchFilter(filter);
  };

  const toggleAllTodos = () => {
    let toggledTodos;

    if (todos.some(todo => todo.completed === false)) {
      toggledTodos
        = todos.map(todo => ({
          ...todo,
          completed: true,
        }));
    } else {
      toggledTodos
        = todos.map(todo => ({
          ...todo,
          completed: false,
        }));
    }

    setTodos(toggledTodos);
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
    const selectedTodo = todos.find(selected => todo.id === selected.id);

    selectedTodo.completed = !selectedTodo.completed;
    setTodos([...todos]);
  };

  const editTodoTitle = (todo, newTitle) => {
    const selectedTodo = todos.find(selected => todo.id === selected.id);

    selectedTodo.title = newTitle;
  };

  const clearCompletedTodos = () => {
    setTodos(prevTodos => prevTodos.filter(
      todo => todo.completed !== true,
    ));
  };

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
        todos={switchFilter(activeFilter)}
        deleteTodo={deleteTodo}
        toggleTodoComplete={toggleTodoComplete}
        editTodoTitle={editTodoTitle}
      />

      <footer className="footer">
        <span className="todo-count">
          {todos.filter(todo => !todo.completed).length}
          {' '}
          items left
        </span>
        <TodoFilter
          todos={todos}
          filterChange={filterChange}
        />
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
