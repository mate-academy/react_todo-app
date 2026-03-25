import { useContext } from 'react';
import '../styles/filters.scss';
import { TodoFilterStatus, TodosContext } from './TodosProvider';
import classNames from 'classnames';
import { checkSomeTodosCompleted } from '../utils';

export const TodoFooter = () => {
  const { todos, setTodoFilterStatus, todoFilterStatus, deleteTodo } =
    useContext(TodosContext);

  function handleClearAllCompletedTodos() {
    todos.forEach(todo => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }
    });
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {[
          TodoFilterStatus.All,
          TodoFilterStatus.Active,
          TodoFilterStatus.Completed,
        ].map(filterName => (
          <a
            key={filterName}
            href="#/"
            className={classNames('filter__link', {
              selected: filterName === todoFilterStatus,
            })}
            onClick={() => setTodoFilterStatus(filterName)}
            data-cy={`FilterLink${filterName}`}
          >
            {filterName}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!checkSomeTodosCompleted(todos)}
        onClick={handleClearAllCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
