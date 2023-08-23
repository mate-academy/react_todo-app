import {
  useContext,
  useMemo,
  useState,
  FC,
} from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';

export const Main: FC = () => {
  const { todos, updateTodos } = useContext(TodosContext);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleToggleAll = () => {
    const newIsAllChecked = !isAllChecked;

    const updatedTodos = todos.map((todo: Todo) => ({
      ...todo,
      completed: newIsAllChecked,
    }));

    updateTodos(updatedTodos);
    setIsAllChecked(newIsAllChecked);
  };

  const allTodosCompleted = useMemo(
    () => todos.every((todo: Todo) => todo.completed),
    [todos],
  );

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allTodosCompleted}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
      <TodoList />
    </section>
  );
};
