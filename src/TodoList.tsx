import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

export const TodoList = () => {
  const { todos, filteredTodos } = useContext(TodosContext);

  if (todos.length === 0) {
    return null;
  }

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos().map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </ul>
  );
};
