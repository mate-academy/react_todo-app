import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';
import { Status } from './types/Status';

export const TodoList: React.FC = () => {
  const { todos, status } = useContext(TodosContext);

  let visibleTodos = [];

  switch (status) {
    case Status.all:
      visibleTodos = todos;
      break;

    case Status.active:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.completed:
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    default:
      visibleTodos = todos;
      break;
  }

  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
