import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';

export const TodosClearAllButton: React.FC = () => {
  const { items, setItems } = useContext(TodosContext);

  const handleButtonClick = () => {
    const notCompletedItems = items.filter(item => !item.completed);

    setItems(notCompletedItems);
  };

  return (
    <button
      onClick={handleButtonClick}
      type="button"
      className="clear-completed"
    >
      Clear completed
    </button>
  );
};
