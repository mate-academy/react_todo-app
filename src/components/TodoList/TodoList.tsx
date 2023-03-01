import { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { AppContext } from '../AppContext/AppContext';
import { TodoItem } from '../TodoItem';

export const TodoList = () => {
  const [isActiveField, setIsActiveField] = useState<number>(0);
  const todosData = useContext(AppContext);

  return (
    <>
      <ul className="todo-list" data-cy="todoList">
        {todosData?.filteredTodos?.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isActiveField={isActiveField}
            setIsActiveField={setIsActiveField}
          />
        ))}
      </ul>
    </>
  );
};
