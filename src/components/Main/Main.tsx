import { useContext } from 'react';

import { TodoList } from '../TodoList';
import { TodosContext } from '../TodosContext';

type Props = {};

export const Main: React.FC<Props> = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isChecked = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    const isAllCheked = todos.every(todo => todo.completed);
    const modifiedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCheked,
    }));

    setTodos(modifiedTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggleAll}
        checked={isChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
