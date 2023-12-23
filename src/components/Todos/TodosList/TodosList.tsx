import { FC, useMemo } from 'react';
import { Todo } from '../../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { useDispatch } from '../../../contexts/TodosContext';

type Props = {
  todos: Todo[]
};

export const TodosList: FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  const allIsCompleted = useMemo(
    () => todos.every(({ completed }) => completed), [todos],
  );

  const handleToggleAll = () => {
    dispatch({
      type: 'toggleAll',
      payload: !allIsCompleted,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={allIsCompleted}
        onClick={handleToggleAll}
      />
      <label htmlFor="toggle-all">
        {
          allIsCompleted
            ? 'Mark all as active'
            : 'Mark all as complete'
        }
      </label>
      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
