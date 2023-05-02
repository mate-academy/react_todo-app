import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { Status, filters } from '../constants';

type Props = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
};

export const Todolist: React.FC<Props> = ({ todos, setTodos }) => {
  const { pathname } = useLocation();

  const isEveryCompleted = useMemo(() => (
    todos.every(todo => todo.completed)
  ), [todos]);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      switch (pathname) {
        case filters[1].link:
          return !todo.completed;

        case filters[2].link:
          return todo.completed;

        default:
          return Status.ALL;
      }
    })
  ), [todos, pathname]);

  const toggleAll = () => {
    if (isEveryCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todos.map(todo => (
        todo.completed
          ? todo
          : { ...todo, completed: true }
      )));
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={toggleAll}
        checked={isEveryCompleted}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </section>
  );
};
