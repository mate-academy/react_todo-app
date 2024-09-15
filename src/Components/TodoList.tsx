/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
