/* eslint-disable no-console */
import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import './style.css';
import { GlobalContextController } from '../GlobalStateProvider';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const { todos, visibleStatus } = useContext(GlobalContextController);
  const visibleTodos = todos.filter(todo => {
    if (visibleStatus === Status.All) {
      return true;
    }

    if (visibleStatus === Status.Active && !todo.completed) {
      return true;
    }

    if (visibleStatus === Status.Completed && todo.completed) {
      return true;
    }

    return false;
  });

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
