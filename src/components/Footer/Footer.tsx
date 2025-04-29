import { useContext } from 'react';
import { Status } from '../../types';
import { TodoContext } from '../../context/TodoContextProvider';
import FilterLink from './FilterLink';

export default function Footer() {
  const { todos, setTodos } = useContext(TodoContext);

  const numberOfUncompleted = todos.filter(el => !el.completed).length;
  const hasOneOrMoreCompleted = todos.some(el => el.completed);

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {numberOfUncompleted} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <FilterLink status={Status.ALL} />
            <FilterLink status={Status.ACTIVE} />
            <FilterLink status={Status.COMPLETED} />
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={!hasOneOrMoreCompleted}
            onClick={() => setTodos(todos.filter(el => !el.completed))}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
}
