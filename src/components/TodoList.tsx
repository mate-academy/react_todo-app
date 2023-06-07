import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { Status } from '../enums/Status';

type Props = {
  todos: Todo[],
  toggleCompletedStatus: (
    todoIds: number[],
    data: Pick<Todo, 'completed'>,
  ) => void;
  onTodoDelete: (todoIds: number[]) => void;
  handleTitleChange: (todoId: number, title: string) => void;
};

export const TodoList: FC<Props> = ({
  todos,
  toggleCompletedStatus,
  onTodoDelete,
  handleTitleChange,
}) => {
  const location = useLocation();
  const [todosList, setTodosList] = useState<Todo[]>(todos);

  const filterTodosByPathname = () => {
    if (location.pathname.endsWith(Status.Active)) {
      const filteredArray = todos.filter(todo => !todo.completed);

      setTodosList(filteredArray);

      return;
    }

    if (location.pathname.includes(Status.Completed)) {
      const filteredArray = todos.filter(todo => todo.completed);

      setTodosList(filteredArray);

      return;
    }

    setTodosList(todos);
  };

  useEffect(() => {
    filterTodosByPathname();
  }, [location, todos]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {
        todosList.map(item => (
          <TodoItem
            todo={item}
            key={item.id}
            toggleCompletedStatus={toggleCompletedStatus}
            onTodoDelete={onTodoDelete}
            handleTitleChange={handleTitleChange}
          />
        ))
      }
    </ul>
  );
};
