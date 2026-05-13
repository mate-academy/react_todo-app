/* eslint-disable jsx-a11y/label-has-associated-control */

import { useTodos } from '../../providers/TodosProvider';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { preparedTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preparedTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
