import { useContext } from 'react';

import { TodoItem } from '../TodoItem/TodoItem';
import { StateContext } from '../../Context/TodoContext';
import { Status } from '../../Types/Status';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {
        todos
          .filter((todo) => {
            switch (filter) {
              case Status.ACTIVE:
                return !todo.completed;

              case Status.COMPLETED:
                return todo.completed;

              default:
                return true;
            }
          })
          .map((todo) => <TodoItem key={todo.id} todoItem={todo} />)
      }
    </ul>
  );
};
