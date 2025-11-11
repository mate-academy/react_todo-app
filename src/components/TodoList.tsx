import React from 'react';
import TodoItem from './TodoItem';
import { TodoContext } from '../contexts/TodoContext';

export const TodoList: React.FC = () => {
  const {filteredTodos} = React.useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
