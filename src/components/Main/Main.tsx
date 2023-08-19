import { useContext, useMemo, useState } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { Status } from '../../enums/Status';

export const Main = () => {
  const { todos, updateTodos } = useContext(TodosContext);
  const [isToggleAllChecked, setIsToggleAllChecked] = useState(true);

  const isAllChecked = useMemo(() => {
    return todos.every((todo: Todo) => todo.completed === Status.Completed);
  }, [todos]);

  const handleToggleAll = () => {
    setIsToggleAllChecked(!isToggleAllChecked);

    updateTodos(todos.map((todo: Todo) => ({
      ...todo,
      completed: isToggleAllChecked ? Status.Completed : '',
    })));
  };

  return (
    <section className="main">
      {todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={isAllChecked}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
      <TodoList />
    </section>
  );
};
