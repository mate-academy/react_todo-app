/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useState } from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { FilterStatus } from './types/Filter';
import { TodosContext } from './components/TodosContext/TodosContext';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [filter, setFilter] = useState(FilterStatus.ALL);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodos(title: string) {
    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  function clearCompletedTodo() {
    setTodos(todos.filter(todo => !todo.completed));
  }

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
        />
        <TodoList filteredTodo={filteredTodo} />
        {todos.length > 0 && (
          <Footer
            filter={filter}
            changeStatusOfTodos={changeStatusOfTodos}
            clearCompletedTodo={clearCompletedTodo}
          />
        )}
      </div>
    </div>
  );
};
