import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { StateContext } from '../../utils/GlobalContext';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(StateContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
