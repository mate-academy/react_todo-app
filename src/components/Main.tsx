import { useContext, useState } from 'react';
import classNames from 'classnames';
import { TodoList } from './TodoList';
import { TodosContext } from '../contexts/TodosContext';

export const Main: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [state, setState] = useState(
    () => !todos.every(todo => todo.completed),
  );

  const toggleAll = () => {
    const toggledTodos = todos.map(todo => {
      const currentTodo = { ...todo };

      currentTodo.completed = state;

      return currentTodo;
    });

    setTodos(toggledTodos);
    setState(!state);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className={classNames('toggle-all', { checked: !state })}
        data-cy="toggleAll"
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList onEveryToggled={setState} />
    </section>
  );
};
