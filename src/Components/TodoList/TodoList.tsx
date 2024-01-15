import { useContext } from 'react';
import { StateContext } from '../../state/TodosContext';
import { TodoItem } from '../TodoItem';
import { Status } from '../../types';

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
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todoItem={todo}
            />
          ))
      }
    </ul>
  );
};
