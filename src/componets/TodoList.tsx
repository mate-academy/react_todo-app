/* eslint-disable jsx-a11y/control-has-associated-label */
// import React from "react";
import { useMemo } from 'react';
import classNames from 'classnames';
import { Todos } from '../type/Todos';
import { TodoItems } from './TodoItems';
import { FilterById } from '../type/FilterById';

type Props = {
  todos: Todos[]
  setTodos: (value: (todos: Todos[]) => Todos[]) => void
  filterId: FilterById
};

const { ACTIVE, COMPLETED } = FilterById;

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  filterId,
}) => {
  const filteredTodos = useMemo(() => {
    switch (filterId) {
      case (ACTIVE):
        return todos.filter(todo => !todo.completed);

      case (COMPLETED):
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, filterId]);

  const isAllCompleted = todos.every(todo => todo.completed);

  const changeCompleted = (todoId: number) => {
    setTodos(prevTodos => prevTodos.map((todo: Todos) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    }));
  };

  const changeTitle = (
    value: string, todoId: number,
  ) => {
    setTodos(prevTodos => prevTodos.map((todo: Todos) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title: value };
    }));
  };

  const allCopleteTodos = () => {
    setTodos(prevTodos => prevTodos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    })));
  };

  const deleteTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className={classNames('toggle-all')}
        data-cy="toggleAll"
        checked={isAllCompleted}
        onChange={allCopleteTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {
          filteredTodos.map((todo) => (
            <TodoItems
              key={todo.id}
              changeTitle={changeTitle}
              todo={todo}
              changeCompleted={changeCompleted}
              deletedTodo={deleteTodo}

            />

          ))
        }
      </ul>
    </section>
  );
};
