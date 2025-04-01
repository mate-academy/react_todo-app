/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useMemo } from 'react';
import { TodoContext } from '../context/TodoProvider';
import { Todo } from './Todo';
import { getTodos } from '../api/todo';
import { Filter, FilterContext } from '../context/FilterProvider';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { filter } = useContext(FilterContext);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .catch(() => {
        console.error('Failed to download todos from server');
      });
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    if (filter === Filter.Active) {
      return todos.filter(todo => !todo.completed);
    } else if (filter === Filter.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </section>
  );
};
