import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { TodoItem } from '../TodoItem';

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoList: React.FC = () => {
  const { filterTodos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
