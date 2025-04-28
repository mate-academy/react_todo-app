import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoComponent } from '../TodoComponent';

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoList: React.FC = React.memo(() => {
  const { todos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </section>
  );
});

TodoList.displayName = 'TodoList';
