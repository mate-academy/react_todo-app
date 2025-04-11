import { useContext } from 'react';
import { StateContext } from '../../store';
import { TodoItem } from '../TodoItem';
import { filterTodo } from '../../services';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);

  const filteredTodo = filterTodo(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
