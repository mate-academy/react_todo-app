import { Todos } from './Todos';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  selectedFilter: string;
};

export const TodoList = ({ todos, selectedFilter }: Props) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos
      .filter(todo => {
        if (selectedFilter === 'active') {
          return todo.completed === false;
        } else if (selectedFilter === 'completed') {
          return todo.completed === true;
        } else {
          return true;
        }
      })
      .map(todo => (
        <Todos key={todo.id} todo={todo} />
      ))}
  </section>
);
