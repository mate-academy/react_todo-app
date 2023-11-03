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

  return (
    todos.length !== 0 ? (
      <footer className="footer">
        <span
          className="todo-count"
          data-cy="todosCounter"
        >
          {`${getNumberActiveTodo(todos)} items left`}
        </span>

        <TodosFilter />

        {todos.some(todo => todo.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleDeleteCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    ) : (
      <></>
    )
  );
};
