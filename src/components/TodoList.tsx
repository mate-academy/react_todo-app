import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoList: FC<Props> = ({
  todos,
  setTodos,
}) => {
  const { pathname } = useLocation();

  const filteredTodos = useMemo(() => todos.filter((todo) => {
    switch (pathname) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return Filter.All;
    }
  }), [todos, pathname]);

  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {filteredTodos.map(item => (
        <TodoItem
          key={item.id}
          todo={item}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
