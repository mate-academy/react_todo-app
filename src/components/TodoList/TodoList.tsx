import { useContext } from 'react';

import { TodoContext } from '../../context/TodoContext';
import { getFilteredTodos } from '../../utils/utils';
import { FilterContext } from '../../context/FilterContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { selectedFilter } = useContext(FilterContext);

  const toggleAll = () => {
    setTodos(currentTodos => {
      const todosCopy = [...currentTodos];

      return todosCopy.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }));
    });
  };

  const filteredTodos = getFilteredTodos(todos, selectedFilter);

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onClick={toggleAll}
          />
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>
        </>
      )}

      <ul className="todo-list" data-cy="todosList">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
};
