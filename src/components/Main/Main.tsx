import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  onUpdate: (newTodo: Todo) => void;
  deleteTodo: (deletedTodo: Todo) => void;
};

export const Main: React.FC<Props> = ({ todos, onUpdate, deleteTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          onUpdate={onUpdate}
          key={todo.id}
          deleteTodo={deleteTodo}
        />
      ))}
    </section>
  );
};
