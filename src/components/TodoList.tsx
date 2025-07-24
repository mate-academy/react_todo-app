import { FilterType } from '../constants/FilterType';
import { useGlobalState } from '../hooks/GlobalHooks';
import { filterTodos } from '../utils/filterTodos';
import { TodoItem } from './TodoItem';

type Props = {
  filterBy: FilterType;
};
export const TodoList: React.FC<Props> = ({ filterBy }) => {
  const { todos } = useGlobalState();
  const visibleTodos = filterTodos(todos, filterBy);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
