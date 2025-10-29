import { Todo } from '../types/Todo';

export enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

type FooterTodosProps = {
  todos: Todo[];
  filter: (typeOfSort: FilterType) => void;
  clearCompleted: () => void;
  selected: FilterType;
};

const filters: { type: FilterType; href: string; cy: string }[] = [
  { type: FilterType.All, href: '#/', cy: 'FilterLinkAll' },
  { type: FilterType.Active, href: '#/active', cy: 'FilterLinkActive' },
  {
    type: FilterType.Completed,
    href: '#/completed',
    cy: 'FilterLinkCompleted',
  },
];

export const FooterTodos: React.FC<FooterTodosProps> = ({
  todos,
  filter,
  clearCompleted,
  selected,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodosCount = todos.filter(
    todo => !todo.completed && todo.id !== 0,
  ).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} item
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(({ type, href, cy }) => (
          <a
            key={type}
            href={href}
            className={`filter__link ${selected === type ? 'selected' : ''}`}
            data-cy={cy}
            onClick={() => filter(type)}
          >
            {type}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompleted}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
