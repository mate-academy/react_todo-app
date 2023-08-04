/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useMemo } from 'react';
import { TodoContextList } from '../Services/TodosContext';
import { TodoItem } from './TodoItem';
import { Status } from '../Services/Types';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodoContextList);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case Status.Active:
        return todos.filter((todo) => !todo.completed);
      case Status.Completed:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
