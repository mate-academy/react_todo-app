/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState<Status>(Status.all);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(todos.filter(currentTodo => currentTodo.id !== todo.id));
  };

  const toggleAllChecked = () => {
    const allChecked = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => ({ ...todo, completed: !allChecked })));
  };

  const updateTodo = (newTodo: Todo) => {
    const index = todos.findIndex(todo => todo.id === newTodo.id);
    const updatedTodos = [...todos];

    updatedTodos[index] = newTodo;

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(currentTodo => !currentTodo.completed));
  };

  const getList = (sortType: Status): Todo[] => {
    switch (sortType) {
      case Status.active:
        return todos.filter(todo => !todo.completed);
      case Status.completed:
        return todos.filter(todo => todo.completed);
      case Status.all:
        return todos;
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {/* <TodoProvider> */}
        <Header
          addTodo={addTodo}
          toggleAllChecked={toggleAllChecked}
          allChecked={todos.every(todo => todo.completed)}
        />

        <TodoList
          todos={getList(status)}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        {todos.length > 0 && (
          <Footer
            todos={todos}
            setStatus={setStatus}
            status={status}
            clearCompleted={clearCompleted}
          />
        )}
        {/* </TodoProvider> */}
      </div>
    </div>
  );
};
