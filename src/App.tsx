/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';

import { Header } from './Components/Header';
import { Main } from './Components/Main/Main';
import { Footer } from './Components/Footer';
import { Todo } from './Types/todo';
import { Filter } from './Types/filter';
import { TodoContext} from './Components/Context/TodoContext';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const [todoValue, setTodoValue] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const addTodo = () => {
    if (todoValue.trim() !== '') {
      const newTodo: Todo = {
        id: +new Date(),
        title: todoValue,
        completed: false,
      };

      console.log('Adding Todo:', newTodo);

      setTodos(prevTodos => {
        return [newTodo, ...prevTodos];
      });

      setTodoValue('');
    }
  };

  const completed = todos.filter(todo => todo.completed);
  const active = todos.filter(todo => !todo.completed);

  useEffect(() => {
    console.log('todos:', todos);
    console.log('completed:', completed);
  }, [todos]);

  function getVisibleTodos(): Todo[] {
    switch (filter) {
      case Filter.Active:
        return active;

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

  const deleteTodo = (todoId: number) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== todoId));
  };

  return (
      <div className="todoapp">
        <Header
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          addTodo={addTodo}
        />

        <Main
          visibleTodos={getVisibleTodos()}
          deleteTodo={deleteTodo}
        />

        <Footer
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
          active={active}
          completed={completed}
        />
      </div>
  );
};
