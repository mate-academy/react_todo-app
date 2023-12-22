import { useContext, useMemo, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';
import { getFilteredTodos } from '../servises/getFilteredTodos';

export const TodosList = () => {
  const {
    status, todos, setTodos, setAmountOfActive,
  } = useContext(TodosContext);

  const [isAllCheked, setIsAllCheked] = useState(false);

  const filteredTodo = useMemo(() => {
    return getFilteredTodos(todos, status);
  }, [todos, status]);

  const toggleAllCoplited = () => {
    setTodos(todos.map(item => {
      return { ...item, completed: !isAllCheked };
    }));

    setIsAllCheked(!isAllCheked);
    setAmountOfActive(isAllCheked ? 0 : todos.length);
  };

  return (
    <main>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={toggleAllCoplited}
          checked={isAllCheked}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todosList">
          {filteredTodo.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>

      </section>
    </main>
  );
};
