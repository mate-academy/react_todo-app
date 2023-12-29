/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { StateContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status } from '../../types/enums/Status';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {
        todos
          .filter((todo) => {
            switch (filter) {
              case Status.Active:
                return !todo.completed;

              case Status.Completed:
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
