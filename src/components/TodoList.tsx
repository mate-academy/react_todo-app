import React from 'react';
import { Todo as TodoType } from '../types/Todo';
import { Todo } from './Todo';

type Props = {
  fieldTitle: React.RefObject<HTMLInputElement>;
  todos: TodoType[];
};

export const TodoList: React.FC<Props> = ({ fieldTitle, todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo todo={todo} fieldTitle={fieldTitle} key={todo.id} />
      ))}
    </section>
  );
};
