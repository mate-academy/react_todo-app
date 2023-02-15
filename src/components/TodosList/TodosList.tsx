import { Todo } from '../../types/types';
import { TodoItem } from './TodoItem/TodoItem';

type Props = {
  visibleTodos: Todo[],
  setTodos: (value: Todo[]) => void,
  setVisibleTodos: (value: Todo[]) => void,
  todos: Todo[],
  setIsToggled: (value: boolean) => void,
  isToggled: boolean,
};

export const TodosList:React.FC<Props> = ({
  visibleTodos,
  setTodos,
  setVisibleTodos,
  todos,
  setIsToggled,
  isToggled,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {
        visibleTodos.map((todo: Todo) => {
          return (
            <TodoItem
              visibleTodos={visibleTodos}
              setVisibleTodos={setVisibleTodos}
              todos={todos}
              setTodos={setTodos}
              todo={todo}
              key={todo.id}
              setIsToggled={setIsToggled}
              isToggled={isToggled}
            />
          );
        })
      }
    </ul>
  );
};
