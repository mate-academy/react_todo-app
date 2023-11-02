import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {
        todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))
      }
    </ul>
  );
};
