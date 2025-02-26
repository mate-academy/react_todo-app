import { FC, useContext } from 'react';
import { TodosContext } from '../TodosProvider';
import { TodoItem } from '../TodoItem';

export const TodoList: FC = () => {
  const { displayedTodos: todos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
