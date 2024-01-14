import { useContext } from 'react';
import { Status, Todo, TodoListProps } from '../../types';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoList: React.FC<TodoListProps> = () => {
  const { todos, filterStatus } = useContext(TodosContext);

  const filterTodos = () => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case Status.All:
          return todos;
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {filterTodos().map((item: Todo) => (
        <TodoItem todo={item} key={item.id} />
      ))}
    </ul>
  );
};
