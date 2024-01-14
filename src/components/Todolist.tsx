import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[]
};

export const Todolist: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.length > 0 && todos.map((todo, index) => (
        <TodoItem todo={todo} id={index} key={todo.id} />
      ))}
    </ul>
  );
};
