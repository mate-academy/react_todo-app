/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useState, useEffect } from 'react';

import { Header } from './Components/Header';
import { Main } from './Components/Main/Main';
import { Footer } from './Components/Footer';
import { Todo } from './Types/todo';
import { Filter } from './Types/filter';

export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoValue, setTodoValue] = useState('')
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const addTodo = () => {
    if (todoValue.trim() !== '') {
      const newTodo: Todo = {
        id: +new Date(),
        title: todoValue,
        completed: false,
      };

      setTodos(prevTodos => [newTodo, ...prevTodos]);
      setTodoValue('');
    }
  };

  const completed = todos.filter(todo => todo.completed);

  useEffect(() => {
    console.log('todos:', todos);
    console.log('completed:', completed);
  }, [todos]);

  function getVisibleTodos(): Todo[] {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return completed;

      case Filter.All:
      default:
        return todos;
    }
  }

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <Header
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        addTodo={addTodo}
      />

      <Main
        todos={todos}
        visibleTodos={getVisibleTodos()}
        setTodos={setTodos}
      />

      <Footer
        todos={todos}
        setFilter={setFilter}
        completed={completed}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};
