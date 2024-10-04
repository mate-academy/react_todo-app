import { useContext, useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { StateContext } from '../GlobalContext';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter],
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
