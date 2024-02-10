import { useContext, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

export const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [toggleAll, setToggleAll] = useState(false);

  const handleToggleAll = () => {
    // Отримуємо список змінених справ з оновленим статусом виконання
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    }));

    // Оновлюємо стан справ у контексті
    setTodos(updatedTodos);
    // Змінюємо стан toggleAll
    setToggleAll(!toggleAll);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={toggleAll}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
};
