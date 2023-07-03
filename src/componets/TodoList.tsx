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

const { ACTIVE, COMPLATED } = FilterById;

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  filterId,
}) => {
  const filteredTodos = useMemo(() => {
    switch (filterId) {
      case (ACTIVE):
        return todos.filter(todo => !todo.complated);

      case (COMPLATED):
        return todos.filter(todo => todo.complated);

      default:
        return todos;
    }
  }, [todos, filterId]);

  const isAllComplated = todos.every(todo => todo.complated);

  const changeComplated = (todoId: number) => {
    setTodos(prevTodos => prevTodos.map((todo: Todos) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, complated: !todo.complated };
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
      complated: !isAllComplated,
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
        checked={isAllComplated}
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
              changeComplated={changeComplated}
              deletedTodo={deleteTodo}

            />

          ))
        }
      </ul>
    </section>
  );
};
