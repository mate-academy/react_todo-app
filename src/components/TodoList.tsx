import { FC, useContext } from 'react';
import { StateContext } from '../lib/TodosContext';
import { Status } from '../type/Status';
import { TodoItem } from './TodoItem';

export const TodoList: FC = () => {
  const { todos, query } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    switch (query) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};
