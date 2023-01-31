import { Todo } from '../../types/types';
import { TodoItem } from './TodoItem/TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  visibleTodos: Todo[],
  setTodos: (value: Todo[]) => void,
  setVisibleTodos: (value: Todo[]) => void,
  todos: Todo[],
  setIsToggled: (value: boolean) => void,
  isToggled: boolean,
};

export const TodoList:React.FC<Props> = ({
  visibleTodos,
  setTodos,
  setVisibleTodos,
  todos,
  setIsToggled,
  isToggled,
}) => {
  // console.log(setVisibleTodos, todos, visibleTodos);

  return (
    <ul className="todo-list" data-cy="todoList">
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
