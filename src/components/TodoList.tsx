/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../type/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  filteredTodos: Todo[];
};

export const TododList: React.FC<TodoListProps> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        const { id } = todo;

        return <TodoItem todo={todo} key={id} />;
      })}
    </section>
  );
};
