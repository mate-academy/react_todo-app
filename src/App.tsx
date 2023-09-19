/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { TodosFilter } from './components/TodosFilter';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { SortBy, Todo } from './types';

let todos = localStorage.getItem('todosStorage');
let todosFromLocalStorage: Todo[] = [];

if (todos !== null) {
  todosFromLocalStorage = JSON.parse(todos);
  if (!Array.isArray(todosFromLocalStorage)) {
    todosFromLocalStorage = [];
  }
}

export const App: React.FC = () => {
  const [completedTodos, setCompletedTodos] = useState<number[]>(
    todosFromLocalStorage.filter(todo => todo.completed)
      .map(todoId => todoId.id),
  );
  const [todosList, setTodos] = useState<Todo[]>(
    todosFromLocalStorage,
  );
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.all);

  const todosLeft = useMemo(() => {
    return todosList.length - completedTodos.length;
  }, [todos, completedTodos]);

  const updateCheckTodo = (todoId: number) => {
    setCompletedTodos((prevCompletedTodo) => {
      if (prevCompletedTodo.includes(todoId)) {
        return prevCompletedTodo.filter((number) => number !== todoId);
      }

      return [...prevCompletedTodo, todoId];
    });
  };

  useEffect(() => {
    setTodos(todosList.map(todo => (completedTodos.includes(todo.id)
      ? { ...todo, completed: true }
      : { ...todo, completed: false })));
  }, [completedTodos]);

  useEffect(() => {
    localStorage.setItem('todosStorage', JSON.stringify(todosList));
    todos = localStorage.getItem('todosStorage');
  }, [todosList]);

  const handleUpdateCheckTodo = (value: number) => updateCheckTodo(value);

  const handleAddTodo = (newTodo: Todo) => setTodos([...todosList, newTodo]);

  const handleDeleteTodo = (todoId: number) => {
    setTodos(todosList.filter(todo => todo.id !== todoId));
    setCompletedTodos(completedTodos.filter(number => number !== todoId));
  };

  const deleteCompletedTodos = () => {
    setCompletedTodos([]);
    setTodos(todosList.filter(todo => !todo.completed));
  };

  const handleSetSortBy = (value: SortBy) => {
    setSortBy(value);
  };

  const handleSetTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  const updateCheckAllTodo = () => {
    if (todosLeft === 0) {
      setTodos(todosList.map(todo => ({ ...todo, completed: false })));
      setCompletedTodos([]);
    } else {
      setTodos(todosList.map(todo => ({ ...todo, completed: true })));
      setCompletedTodos(todosList.map(todo => todo.id));
    }
  };

  return (
    <div className="todoapp">
      <Header handleAddTodo={handleAddTodo} />

      <section className="main">
        {todosLeft !== 0 ? (
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
        <label htmlFor="toggle-all">Mark all as complete</label>

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
          todosLeft={todosLeft}
          completedTodos={completedTodos}
          deleteCompletedTodos={deleteCompletedTodos}
        />
      ) : null}
    </div>
  );
};
