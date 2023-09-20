/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { TodosFilter } from './components/TodosFilter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { SortBy, Todo } from './types';

const todosFromLocalStorage = localStorage.getItem('todosStorage');
const parsedTodos = todosFromLocalStorage
  ? JSON.parse(todosFromLocalStorage) : [];
const todosArray = Array.isArray(parsedTodos) ? parsedTodos : [];

export const App: React.FC = () => {
  const [completedTodosId, setCompletedTodosId] = useState<number[]>(
    todosArray.filter(todo => todo.completed)
      .map(todoId => todoId.id),
  );
  const [todosList, setTodos] = useState<Todo[]>(todosArray);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.all);

  const updateCheckTodo = (todoId: number) => {
    setCompletedTodosId((prevCompletedTodo) => {
      if (prevCompletedTodo.includes(todoId)) {
        return prevCompletedTodo.filter((number) => number !== todoId);
      }

      return [...prevCompletedTodo, todoId];
    });
  };

  useEffect(() => {
    setTodos(todosList.map(todo => (completedTodosId.includes(todo.id)
      ? { ...todo, completed: true }
      : { ...todo, completed: false })));
  }, [completedTodosId]);

  useEffect(() => {
    localStorage.setItem('todosStorage', JSON.stringify(todosList));
  }, [todosList]);

  const handleUpdateCheckTodo = (value: number) => updateCheckTodo(value);

  const handleAddTodo = (newTodo: Todo) => setTodos([...todosList, newTodo]);

  const handleDeleteTodo = (todoId: number) => {
    setTodos(todosList.filter(todo => todo.id !== todoId));
    setCompletedTodosId(completedTodosId.filter(number => number !== todoId));
  };

  const deleteCompletedTodos = () => {
    setCompletedTodosId([]);
    setTodos(todosList.filter(todo => !todo.completed));
  };

  const handleSetSortBy = (value: SortBy) => {
    setSortBy(value);
  };

  const handleSetTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  const updateCheckAllTodo = () => {
    if (todosList.length - completedTodosId.length === 0) {
      setTodos(todosList.map(todo => ({ ...todo, completed: false })));
      setCompletedTodosId([]);
    } else {
      setTodos(todosList.map(todo => ({ ...todo, completed: true })));
      setCompletedTodosId(todosList.map(todo => todo.id));
    }
  };

  return (
    <div className="todoapp">
      <Header handleAddTodo={handleAddTodo} />

      <section className="main">
        {todosList.length - completedTodosId.length !== 0 ? (
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={updateCheckAllTodo}
          />
        ) : (
          <input
            type="checkbox"
            checked
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={updateCheckAllTodo}
          />
        )}
        {todosList.length > 0 ? (
          <label htmlFor="toggle-all">Mark all as complete</label>
        ) : null}
        <ul className="todo-list" data-cy="todosList">
          <TodoList
            todos={todosList}
            handleUpdateCheckTodo={handleUpdateCheckTodo}
            handleDeleteTodo={handleDeleteTodo}
            sortBy={sortBy}
            handleSetTodos={handleSetTodos}
          />
        </ul>
      </section>
      {todosList.length !== 0 ? (
        <TodosFilter
          handleSetSortBy={handleSetSortBy}
          sortBy={sortBy}
          completedTodosId={completedTodosId}
          deleteCompletedTodos={deleteCompletedTodos}
          todosList={todosList}
        />
      ) : null}
    </div>
  );
};
