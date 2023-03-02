import { useState } from 'react';
import { Error } from '../../types/Error';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  setTodos: (arg: Todo[]) => void,
  setTodosList: () => void | undefined,
  filteredTodos: Todo[] | null,
  setIsError: (arg: Error | null) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setTodosList,
  filteredTodos,
  setIsError,
}) => {
  const [isActiveField, setIsActiveField] = useState<number>(0);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos && filteredTodos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isActiveField={isActiveField}
          setIsActiveField={setIsActiveField}
          setIsError={setIsError}
          todos={todos}
          setTodos={setTodos}
          filteredTodos={filteredTodos}
          setTodosList={setTodosList}
        />
      ))}
    </ul>
  );
};
