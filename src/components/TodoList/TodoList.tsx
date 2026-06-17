import { useContext } from 'react';
import { filterTodo } from '../../utils/filterTodos';
import { TodoInfo } from '../TodoInfo';
import { StateContext } from '../../Store';

export const TodoList = () => {
  const { todos, query } = useContext(StateContext);

  const preparedTodos = filterTodo(todos, query);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {preparedTodos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
