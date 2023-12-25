import { useCallback, useContext } from 'react';
import { Todo } from '../../libs/types';
import { TodoItem } from '../TodoItem';
import { DispatchContext } from '../../packages/context';
import { Actions } from '../../libs/enums';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const dispatch = useContext(DispatchContext);

  const handleRemoveTodo = useCallback((todoId: number) => {
    dispatch({
      type: Actions.remove,
      payload: { todoId },
    });
  }, [dispatch]);

  const handleEditTodo = useCallback((editedTodo: Todo) => {
    dispatch({
      type: Actions.edit,
      payload: { todo: editedTodo },
    });
  }, [dispatch]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {items.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          onRemove={handleRemoveTodo}
          onEdit={handleEditTodo}
        />
      ))}
    </ul>
  );
};
