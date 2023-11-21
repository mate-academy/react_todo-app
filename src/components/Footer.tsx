import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { getNumberActiveTodo } from '../tools/getNumberActiveTodo';
import { TodosFilter } from './TodosFilter';

export const Footer: React.FC = () => {
  const {
    todos,
    setTodos,
  } = useContext(TodosContext);

  const handleDeleteCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  const isVisibleClearBtn = todos.some(todo => todo.completed);
  const countTodosActive = getNumberActiveTodo(todos);

  return (
    <footer className="footer">
      <span
        className="todo-count"
        data-cy="todosCounter"
      >
        {`${countTodosActive} item${countTodosActive !== 1 ? 's' : ''} left`}
      </span>

      <TodosFilter />

      {isVisibleClearBtn && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDeleteCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
