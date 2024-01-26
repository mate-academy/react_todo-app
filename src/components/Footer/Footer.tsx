import { useContext, useMemo } from 'react';
import { TodosContext } from '../../contextes/TodosContext';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { Todo } from '../../types/Todo';

export const Footer = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const removeCompletedTodos = () => setTodos(
    (currentTodos: Todo[]) => currentTodos.filter(todo => !todo.completed),
  );

  const counterOfNonCompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${counterOfNonCompletedTodos} items left`}
      </span>

      <TodoFilter />

      {counterOfNonCompletedTodos !== todos.length && (
        <button
          onClick={removeCompletedTodos}
          type="button"
          className="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
