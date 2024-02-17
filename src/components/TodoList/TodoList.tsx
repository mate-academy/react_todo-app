import { useContext } from 'react';

import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { StateContext } from '../../contexts/StateContext';
import { Status } from '../../types/Status';

type Props = {
  items: Todo[],
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { filter } = useContext(StateContext);

  const filteredTodos = (): Todo[] => {
    let newTodos = [];

    switch (filter) {
      case Status.Active:
        newTodos = items.filter(
          (todo) => !todo.completed,
        );
        break;

      case Status.Completed:
        newTodos = items.filter(
          (todo) => todo.completed,
        );
        break;

      default:
        newTodos = [...items];
    }

    return newTodos;
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos().map(item => (
        <TodoItem data={item} key={item.id} />
      ))}
    </ul>
  );
};
