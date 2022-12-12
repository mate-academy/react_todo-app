import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

interface Props {
  items: Todo[];
  onToggleComplete: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onEdit: (todo: Todo, title: string) => void;
}

export const TodoList: React.FC<Props> = ({
  items,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [itemBeingEdited, setItemBeingEdited] = useState(-1);

  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(todo => (
        <li
          key={todo.id}
          className={classNames(
            {
              completed: todo.completed,
              editing: itemBeingEdited === todo.id,
            },
          )}
        >
          <TodoItem
            item={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEditingMode={setItemBeingEdited}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  );
};
