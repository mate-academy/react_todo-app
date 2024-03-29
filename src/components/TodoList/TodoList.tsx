import { useContext, useMemo } from 'react';
import { TodoContext } from '../../context/TodosContext';
import { Status } from '../../types/types';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filter: Status;
};

export const TodoList: React.FC<Props> = ({ filter }) => {
  const todoItems = useContext(TodoContext);

  const filteredTodoItems = useMemo(() => {
    switch (filter) {
      case 'Active':
        return todoItems.filter(item => !item.completed);
      case 'Completed':
        return todoItems.filter(item => item.completed);
      default:
        return todoItems;
    }
  }, [filter, todoItems]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodoItems.map(todo => (
        <TodoItem key={todo.id.toString()} todo={todo} />
      ))}
    </ul>
  );
};
