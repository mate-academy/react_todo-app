import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TodoInfo } from './TodoInfo';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
