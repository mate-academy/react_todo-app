import { useContext } from 'react';
import { TodoItem } from '../todo_item/TodoItem';
import { TodosContext } from '../../providers/TodosContext';

export const TodoList = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
