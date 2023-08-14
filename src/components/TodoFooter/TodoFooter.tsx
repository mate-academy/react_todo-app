import { useContext } from 'react';

import { TodoContext } from '../../context/TodoContext';

import { TodoFilter } from '../TodoFilter';

export const TodoFooter: React.FC = () => {
  const { todos, deleteCompletedTodos } = useContext(TodoContext);

  const notCompletedTodos = todos.filter(todo => !todo.completed).length;
  const isSomeTodoCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${notCompletedTodos} items left`}
      </span>

      <TodoFilter />

      {isSomeTodoCompleted && (
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
