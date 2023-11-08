import classNames from 'classnames';
import { useContext } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosContext';

export const TodoContent: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const isCompleted = todos.every(todo => todo.completed);

  const toogleAll = () => {
    setTodos(todos.map(todo => {
      return { ...todo, completed: !isCompleted };
    }));
  };

  return (
    <section className="main">
      <input
        data-cy="toggleAll"
        type="checkbox"
        id="toggle-all"
        className={classNames(
          'toggle-all',
          { active: isCompleted },
        )}
        onClick={toogleAll}
        checked={isCompleted}
      />

      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      <TodoList />
    </section>
  );
};
