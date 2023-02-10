import { FC } from 'react';
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

  const filteredTodos = todos.filter((todo) => {
    switch (pathname) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return Filter.All;
    }
  });

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
