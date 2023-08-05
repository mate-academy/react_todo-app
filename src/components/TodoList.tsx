import { FC } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: FC = () => {
  const { todos } = useTodoContext();

  return (
    <section className="main">
      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};
