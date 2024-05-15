import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { TodoInfo } from './TodoInfo';
import { Query } from '../types/Query';

type Props = {
  query: Query;
};

export const TodoList: React.FC<Props> = ({ query }) => {
  const { todos } = useContext(TodoContext);
  let todosToRender = todos;

  switch (query) {
    case Query.All:
      todosToRender = todos;

      break;
    case Query.Active:
      todosToRender = todos.filter(todo => !todo.completed);

      break;
    case Query.Completed:
      todosToRender = todos.filter(todo => todo.completed);
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToRender.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
