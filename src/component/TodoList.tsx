import { useContext, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

export const TodoList: React.FC = () => {
  const { todos, setTodos, filteredTodos } = useContext(TodosContext);
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    }));

    setTodos(updatedTodos);
    setToggleAll(!toggleAll);
  };

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={toggleAll}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
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
