import { useContext, useState } from 'react';
import { TodoListContext } from '../../context/TodoListContext';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { todoList } = useContext(TodoListContext);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);

  const handlerCurrentTodoId = (id: number | null) => {
    setCurrentTodoId(id);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.length > 0 &&
        todoList.map((item: Todo) => (
          <TodoItem
            key={item.id}
            handlerCurrentTodoId={handlerCurrentTodoId}
            currentTodoId={currentTodoId}
            item={item}
          />
        ))}
    </section>
  );
};
