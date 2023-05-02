/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { useLocalStorage } from './UseLocalStorage';

const filteredTodos = (todos: Todo[], filter: string) => {
  switch (filter) {
    case Filter.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case Filter.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [isChecked, setIsChecked] = useState(false);

  const { filter = '' } = useParams();
  const visibleTodos = filteredTodos(todos, filter);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => (
      todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
    toggleAll();
  };

  const clearCompleted = () => {
    setTodos(todos.filter(({ completed }) => !completed));
  };

  return (
    <div className="todoapp">
      <Header addTodo={addTodo} />

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleChecked}
              checked={isChecked}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              todos={visibleTodos}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          </section>
          <Footer
            todos={todos}
            clearCompleted={clearCompleted}
          />
        </>
      )}
    </div>
  );
};
