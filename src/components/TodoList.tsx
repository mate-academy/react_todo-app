import { useContext } from 'react';
import { StateContext } from './Store';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoList: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
