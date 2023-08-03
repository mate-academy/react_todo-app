import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { Todos } from '../../types/Todos';

export const TodosToggleAll: React.FC = () => {
  const { items, setItems } = useContext(TodosContext);
  const isNotCompletedItems = items.some(item => !item.completed);

  const handleInputChange = () => {
    if (isNotCompletedItems) {
      const newItems = items.map(item => {
        if (!item.completed) {
          const newItem: Todos = {
            ...item,
            completed: true,
          };

          return newItem;
        }

        return item;
      });

      setItems(newItems);
    } else {
      const newItems = items.map(item => {
        const newItem: Todos = {
          ...item,
          completed: false,
        };

        return newItem;
      });

      setItems(newItems);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleInputChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
