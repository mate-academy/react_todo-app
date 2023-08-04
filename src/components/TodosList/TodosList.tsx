import { Todos } from '../../types/Todos';
import { TodoItem } from '../TodosItem/TodosItem';

type Props = {
  list: Todos[];
};

export const TodosList: React.FC<Props> = ({ list }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {list.map((item) => {
        return (
          <TodoItem
            title={item.title}
            key={item.id}
            completed={item.completed}
            id={item.id}
          />
        );
      })}
    </ul>
  );
};
