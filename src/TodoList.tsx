import { useContext, useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';
import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const TodoList: React.FC = () => {
  const { todos, status } = useContext(TodosContext);

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    switch (status) {
      case Status.all:
        setVisibleTodos(todos);
        break;

      case Status.active:
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;

      case Status.completed:
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setVisibleTodos(todos);
        break;
    }
  }, [todos, status]);

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
