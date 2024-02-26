/* eslint-disable jsx-a11y/control-has-associated-label */
import { Todo } from '../../types/TodoApp';
import { TodoItem } from '../TodoItem';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map((item: Todo) => (
        <TodoItem todo={item} key={item.id} />
      ))}
    </ul>
  );
};
