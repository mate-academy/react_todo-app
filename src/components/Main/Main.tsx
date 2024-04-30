import { useContext } from 'react';
import { TodosContext } from '../../stor/Context';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {};

export const Main: React.FC<Props> = () => {
  const { visibleTodos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
