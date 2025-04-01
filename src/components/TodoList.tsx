/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { TodoContext } from '../storage/TodoProvider';
import { Todo } from './Todo';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { todos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </section>
  );
};
