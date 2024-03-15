import { useContext } from 'react';
import { TodosContext } from '../todosContext';
import { TodosFilter } from '../TodosFilter';

export const Footer: React.FC = () => {
  const { items, setItems } = useContext(TodosContext);

  const itemsNotCompleted = items.filter(el => el.completed === false);

  const isCompleted = items.some(el => el.completed);

  const handleClearCompletedClick = () => {
    const newItems = items.filter(el => !el.completed);

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
