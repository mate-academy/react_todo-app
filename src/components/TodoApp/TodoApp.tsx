import { useCallback, useContext, useMemo } from 'react';
import { TodosContext } from '../todosContext';
import { TodoList } from '../TodoList';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const TodoApp: React.FC = () => {
  const { items, setItems } = useContext(TodosContext);

  const isAllChecked = useMemo(() => {
    return items.every(el => el.completed);
  }, [items]);

  const handleToggleAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const toggleState = e.target.checked;

      setItems(
        items.map(prevItem => {
          return {
            ...prevItem,
            completed: toggleState,
          };
        }),
      );
    },
    [setItems, items],
  );

  return (
    <div className="todoapp">
      <Header />

      {!!items.length && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={isAllChecked}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList />
        </section>
      )}

      {items.length > 0 && <Footer />}
    </div>
  );
};
