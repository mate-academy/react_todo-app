// import React from 'react';
// import { Todo } from '../types/Todo';
// import { Filter } from '../types/Filter';

// type Props = {
//   todos: Todo[];
//   statusFilter: Filter;
//   onFilterChange: (filter: Filter) => void;
//   onClearCompleted: () => void;
//   completedCount: number;
// };

// export const Footer: React.FC<Props> = ({
//   todos,
//   statusFilter,
//   onFilterChange,
//   onClearCompleted,
//   completedCount,
// }) => {
//   const notCompletedTodos = todos.filter(todo => !todo.completed);

//   const filterLinks = [
//     {
//       name: 'All',
//       href: '#/',
//       dataCy: 'FilterLinkAll',
//       value: Filter.All,
//     },
//     {
//       name: 'Active',
//       href: '#/active',
//       dataCy: 'FilterLinkActive',
//       value: Filter.Active,
//     },
//     {
//       name: 'Completed',
//       href: '#/completed',
//       dataCy: 'FilterLinkCompleted',
//       value: Filter.Completed,
//     },
//   ];

//   return (
//     <footer className="todoapp__footer" data-cy="Footer">
//       <span className="todo-count" data-cy="TodosCounter">
//         {`${notCompletedTodos.length} items left`}
//       </span>

//       <nav className="filter" data-cy="Filter">
//         {filterLinks.map(({ name, href, dataCy, value }) => (
//           <a
//             key={value}
//             href={href}
//             className={`filter__link ${statusFilter === value ? 'selected' : ''}`}
//             data-cy={dataCy}
//             onClick={() => onFilterChange(value)}
//           >
//             {name}
//           </a>
//         ))}
//       </nav>

//       <button
//         type="button"
//         className="todoapp__clear-completed"
//         data-cy="ClearCompletedButton"
//         onClick={onClearCompleted}
//         disabled={completedCount === 0}
//       >
//         Clear completed
//       </button>
//     </footer>
//   );
// };

import React, { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodosContext } from '../context/TodosContext';

export const Footer: React.FC = () => {
  const {
    value: { todos },
    filter: { statusFilter, setStatusFilter },
    onClearCompleted,
    completedCount,
  } = useContext(TodosContext)!;

  const notCompletedTodos = todos.filter(
    (todo: { completed: unknown }) => !todo.completed,
  );

  const filterLinks = [
    {
      name: 'All',
      href: '#/',
      dataCy: 'FilterLinkAll',
      value: Filter.All,
    },
    {
      name: 'Active',
      href: '#/active',
      dataCy: 'FilterLinkActive',
      value: Filter.Active,
    },
    {
      name: 'Completed',
      href: '#/completed',
      dataCy: 'FilterLinkCompleted',
      value: Filter.Completed,
    },
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${notCompletedTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterLinks.map(({ name, href, dataCy, value }) => (
          <a
            key={value}
            href={href}
            className={`filter__link ${statusFilter === value ? 'selected' : ''}`}
            data-cy={dataCy}
            onClick={() => setStatusFilter(value)}
          >
            {name}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
