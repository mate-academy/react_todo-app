import { Todo } from '../types/Todo';
import { TodoElement } from './TodoElement';

type Props = {
  todos: Todo[],
  setIdToDelete: (todoId: number) => void,
  setStateOfTodo: (arg0: Todo) => void,
  setTitleOfTodo: (todoTitle: Todo) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setIdToDelete,
  setStateOfTodo,
  setTitleOfTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoElement
          todo={todo}
          setIdToDelete={setIdToDelete}
          setStateOfTodo={setStateOfTodo}
          setTitleOfTodo={setTitleOfTodo}
        />
      ))}
    </ul>
  );
};
