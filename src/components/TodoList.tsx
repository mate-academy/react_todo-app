import React, { useContext } from 'react';
import { Todo } from './Todo';
import { Context } from '../Context/Context';

export const TodoList: React.FC = () => {
  const { todos } = useContext(Context);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
