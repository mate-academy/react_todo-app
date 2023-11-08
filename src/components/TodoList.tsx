import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, todosFilter } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.filter((todo) => {
        switch (todosFilter) {
          case 'Active':
            return !todo.completed;
          case 'Completed':
            return todo.completed;
          default:
            return true;
        }
      }).map((todo) => (
        <TodoItem getTodo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
