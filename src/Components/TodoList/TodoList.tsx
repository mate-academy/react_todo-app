import React from 'react';
import { Todo } from '../Todo/Todo';
import { Todo as TodoType } from '../../types/Todo';

type Props = {
  todos: TodoType[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
