import { useContext } from 'react';
import { TodosContext } from '../todosContext';
import { TodosFilter } from '../TodosFilter';

export const Footer: React.FC = () => {
  const { items, setItems } = useContext(TodosContext);

  const itemsNotCompleted = items.filter(item => item.completed === false);

  const isCompleted = items.some(item => item.completed);

  const handleClearCompletedClick = () => {
    const newItems = items.filter(item => !item.completed);

    setItems(newItems);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {itemsNotCompleted.length} items left
      </span>

      <TodosFilter />

      {isCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompletedClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
