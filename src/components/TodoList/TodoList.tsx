import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  setActiveTodos: (active: number | ((prev: number) => number)) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setActiveTodos,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          setActiveTodos={setActiveTodos}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
