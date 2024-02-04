import {
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { TodoList } from '../TodoList/TodoList';
import { Todo } from '../Types/Todo';
import { DispatchContext } from '../Store/TodosProvider';

type Props = {
  todos: Todo[],
};

const Main: React.FC<Props> = ({ todos }) => {
  const dispatch = useContext(DispatchContext);

  const checking = useMemo(
    () => (todos.length === 0
      ? false
      : todos.every((({ completed }) => completed))), [todos],
  );

  const toggleAll = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'toggleAll',
      payload: event.target.checked,
    });
  }, [dispatch]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={checking}
        onChange={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList todos={todos} />
    </section>
  );
};

export default Main;
