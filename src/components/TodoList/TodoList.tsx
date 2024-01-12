import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../state/State';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
