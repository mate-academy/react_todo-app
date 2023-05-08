import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[],
  setTodos: (value: Todo[]) => void,
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  items,
  setTodos,
  todos,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem
          key={item.id}
          todos={todos}
          todo={item}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
