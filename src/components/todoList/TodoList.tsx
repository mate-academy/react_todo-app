import './todo-list.css';

import { TodoItem } from '../todoItem';
import { Todo } from '../../types/Todo';

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map((todoItem) => (
        <TodoItem key={todoItem.id} todoItem={todoItem} />
      ))}
    </ul>
  );
};
