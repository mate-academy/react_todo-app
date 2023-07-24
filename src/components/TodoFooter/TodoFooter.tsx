import { useContext } from 'react';

import { TodoContext, TodoUpdateContext } from '../../context/TodoContext';

import { TodoFilter } from '../TodoFilter';

export const TodoFooter: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const { deleteCompletedTodos } = useContext(TodoUpdateContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed).length;
  const isCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodos} items left`}
      </span>

      <TodoFilter />

      {isCompletedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={deleteCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
