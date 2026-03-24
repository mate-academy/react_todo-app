import { useContext } from 'react';
import '../styles/filters.scss';
import { TodosContext } from './TodosProvider';
import classNames from 'classnames';
import { checkSomeTodosCompleted } from '../utils';

export const TodoFooter = () => {
  const { todos, setTodoFilterStatus, todoFilterStatus, deleteTodo } =
    useContext(TodosContext);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>
      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: 'All' === todoFilterStatus,
          })}
          onClick={() => setTodoFilterStatus('All')}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: 'Active' === todoFilterStatus,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setTodoFilterStatus('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: 'Completed' === todoFilterStatus,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setTodoFilterStatus('Completed')}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!checkSomeTodosCompleted(todos)}
        onClick={() => {
          todos.forEach(todo => {
            if (todo.completed) {
              deleteTodo(todo.id);
            }
          });
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
