import { TodoItem } from '../TodoItem/Todo.item';
import { Todo } from '../../types/Todo';

type Props = {
  filterTodos: Todo[];
};

export const TodoList:React.FC<Props> = ({ filterTodos }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {
        filterTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))
      }
    </ul>
  );
};
