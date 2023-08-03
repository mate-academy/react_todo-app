import { useContext, useMemo, useState } from 'react';
import { TodoContextType, TodosContext } from './TodosContext';
import { TodoItem } from './TodoItem';
import { FilterType } from './types/Filter';
// import { Todo } from './types/Todo';
// import { Todo } from './types/Todo';

type Props = {
  filter: FilterType,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodosList: React.FC<Props> = ({ filter }) => {
  const { todos, setTodos } = useContext<TodoContextType>(TodosContext);

  const visibleTodos = useMemo(() => {
    if (filter === FilterType.All) {
      return [...todos];
    }

    if (filter === FilterType.Active) {
      return todos.filter(todo => todo.completed === false);
    }

    if (filter === FilterType.Completed) {
      return todos.filter(todo => todo.completed === true);
    }

    return [...todos];
  },
  [todos]);

  const [toggleAll, setToggleAll] = useState(
    todos.every(todo => todo.completed === true),
  );

  const handleToggle = () => {
    setToggleAll(!toggleAll);

    setTodos(oldTodos => oldTodos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    })));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggle}
        onChange={handleToggle}
        checked={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
};
