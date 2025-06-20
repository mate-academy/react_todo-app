import React from 'react';
import { TodoItem } from '../TodoItem';
import { useTodoContext } from '../../store/useTodoContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos, onTodoDelete, onTodoUpdate } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoDelete={onTodoDelete}
          onTodoUpdate={onTodoUpdate}
        />
      ))}
    </section>
  );
};
