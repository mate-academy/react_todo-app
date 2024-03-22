import { useCallback, useContext, useMemo } from 'react';
import { TodosContext } from './Contexts';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const isToggleAllChecked = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const handleToggleAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const toggleState = event.target.checked;

      setTodos(
        todos.map(prevTodo => {
          return {
            ...prevTodo,
            completed: toggleState,
          };
        }),
      );
    },
    [setTodos, todos],
  );

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={isToggleAllChecked}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>
      )}

      {todos.length > 0 && <Footer />}
    </div>
  );
};
