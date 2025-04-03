import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../Context/TodoContext';
// eslint-disable-next-line import/no-extraneous-dependencies

interface Props {}

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
