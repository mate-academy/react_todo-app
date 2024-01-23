import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';
import Todo from '../types/Todo';

export const TodoList: React.FC = () => {
  const { todos, todosFilter } = useContext(TodosContext);

  const filterTodos = (todoList: Todo[], filter: string): Todo[] => {
    switch (filter) {
      case 'Active':
        return todoList.filter((todo) => !todo.completed);
      case 'Completed':
        return todoList.filter((todo) => todo.completed);
      default:
        return todoList;
    }
  };

  const filteredTodos: Todo[] = filterTodos(todos, todosFilter);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem getTodo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
