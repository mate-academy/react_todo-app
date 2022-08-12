import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoType } from '../../types/todoType';
import { Filter } from '../Filter/Filter';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>(useLocalStorage());
  const [visibleTodos, setVisibleTodos] = useState<TodoType[]>([]);
  const location = useLocation();

  useEffect(() => (
    localStorage.setItem('todos', JSON.stringify(todos))
  ), [todos]);

  useEffect(() => {
    switch (location.pathname) {
      case '/active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case '/completed':
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setVisibleTodos(todos);
    }
  }, [location, todos]);

  const addTask = (userInput: string) => {
    if (userInput.trim()) {
      const newItem = {
        id: +new Date(),
        title: userInput,
        completed: false,
      };

      setTodos([...todos, newItem]);
    }
  };

  const removeTask = (id: number) => {
    setTodos([...todos.filter(todo => todo.id !== id)]);
  };

  const handleToggle = (id: number) => {
    setTodos([
      ...todos.map(todo => (
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
      )),
    ]);
  };

  const toggleAll = () => {
    let togleTodo;

    const allCompleted = todos.every(todo => todo.completed);

    if (allCompleted) {
      togleTodo = todos.map(todo => ({
        ...todo,
        completed: false,
      }));
    } else {
      togleTodo = todos.map(todo => ({
        ...todo,
        completed: true,
      }));
    }

    setTodos(togleTodo);
  };

  const editTitle = useCallback((modifiedTodo: TodoType) => {
    setTodos(todos.map(todo => (
      todo.id === modifiedTodo.id ? modifiedTodo : todo
    )));
  }, [todos]);

  const notCompleted = todos.filter(todo => todo.completed === false);

  const clearCompleted = () => {
    const onlyActive = todos.filter(todo => todo.completed === false);

    setTodos(onlyActive);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoForm addTask={addTask} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          items={visibleTodos}
          toggleTask={handleToggle}
          removeTask={removeTask}
          onEditTitle={editTitle}
        />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${notCompleted.length} items left`}
        </span>

        <Filter />

        {notCompleted.length > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </div>
  );
};
