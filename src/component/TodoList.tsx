import { useContext } from 'react';
import { TodoItem } from './TodoItems';
import { TodoContex } from './Contex';
export const TodoList = () => {
  const { getFilter } = useContext(TodoContex);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {getFilter().map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
