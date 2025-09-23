import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoContext } from '../../context/TodoContext';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
