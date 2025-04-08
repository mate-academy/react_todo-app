import React, { useContext } from 'react';
import { TodoContext } from '../../utils/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
