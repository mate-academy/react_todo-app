import classNames from 'classnames';
import { Filter } from '../types/Filter';
import { useTodo } from './TodoContext';

export const TodoFooter: React.FC = () => {
  const { todos, filter, setFilter, setTodos } = useTodo();
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed);

  const handleDeleteCompleted = () => {
    setTodos(current => current.filter(t => !t.completed));
  };

  const filterring = [
    {
      title: 'All',
      type: Filter.All,
      dataCy: 'FilterLinkAll',
    },
    {
      title: 'Active',
      type: Filter.Active,
      dataCy: 'FilterLinkActive',
    },
    {
      title: 'Completed',
      type: Filter.Completed,
      dataCy: 'FilterLinkCompleted',
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filterring.map(f => {
          return (
            <a
              href="#/"
              key={f.type}
              className={classNames('filter__link', {
                selected: filter === f.type,
              })}
              data-cy={f.dataCy}
              onClick={() => setFilter(f.type)}
            >
              {f.title}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos.length === 0}
        onClick={handleDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
