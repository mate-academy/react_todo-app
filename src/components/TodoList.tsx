import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../Context/TodoContext';

interface Props {}

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
