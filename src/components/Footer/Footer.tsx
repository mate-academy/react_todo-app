import { useContext } from 'react';
import { TodosContext } from '../Context';
import { TodoFilter } from '../TodoFilter';

export const Footer: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const activeItems = todos.reduce((acc, todo) => acc + +!todo.completed, 0);

  const handleOnClick = () => {
    setTodos(todos.filter(el => !el.completed));
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeItems} item${activeItems === 1 ? '' : 's'} left`}
      </span>

      <TodoFilter />

      {todos.some(el => el.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleOnClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
