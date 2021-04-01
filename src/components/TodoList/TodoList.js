import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../TodosContext';

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const todosStatus = todos.every(todo => todo.completed);
  const { pathname } = useLocation();

  const changeTodosStatus = (value) => {
    setTodos(() => (
      todos.map(todoEl => ({
        ...todoEl,
        completed: value,
      }))));
  };

  const getVisibleTodos = () => {
    switch (pathname) {
      case '/active':
        return todos.filter(todo => !todo.completed);

      case '/completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={todosStatus}
        onChange={() => {
          changeTodosStatus(!todosStatus);
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {getVisibleTodos().map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
};
