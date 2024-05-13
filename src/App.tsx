/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer/Footer';

export enum FilterStatus {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState(FilterStatus.ALL);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function countTodo(tasks: Todo[]) {
    let newCount = 0;

    tasks.forEach(task => {
      if (!task.completed) {
        newCount++;
      }

      setCount(newCount);
    });
  }

  useEffect(() => {
    countTodo(todos);
  }, [todos]);

  function addTodos(title: string) {
    const newTodo = {
      id: +new Date(),
      title: title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  function toggleTodo(id: number) {
    setTodos(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function removeTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function clearCompletedTodo() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  const updateTodo = (id: number, title: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, title } : todo)));
  };

  let filteredTodo = todos;

  if (filter === FilterStatus.ACTIVE) {
    filteredTodo = filteredTodo.filter(todo => todo.completed === false);
  }

  if (filter === FilterStatus.COMPLETED) {
    filteredTodo = filteredTodo.filter(todo => todo.completed === true);
  }

  function changeStatusOfTodos(value: FilterStatus) {
    setFilter(value);
  }

  function handleBtnToggleAll() {
    setTodos(tasks => {
      const areAllCompleted = tasks.every(task => task.completed);

      return tasks.map(task => ({ ...task, completed: !areAllCompleted }));
    });
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader
          addTodos={addTodos}
          handleBtnToggleAll={handleBtnToggleAll}
          todos={todos}
        />
        <TodoList
          todos={filteredTodo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
        {todos.length > 0 && (
          <Footer
            count={count}
            changeStatusOfTodos={changeStatusOfTodos}
            clearCompletedTodo={clearCompletedTodo}
          />
        )}
      </div>
    </div>
  );
};
