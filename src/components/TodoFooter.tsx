import { useContext } from 'react';
import { TodosFilter } from './TodosFilter';
import { TodosContext } from './TodosContext';

export const TodoFooter = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleClickCompleted = () => {
    const newTodos = todos.filter(item => !item.completed);

    setTodos(newTodos);
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(item => !item.completed).length} items left`}
      </span>

      <TodosFilter />

      {todos.some(item => item.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClickCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
