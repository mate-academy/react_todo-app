import { SelectedFilter } from '../types/SelectedFilter';
import { SetStateAction } from 'react';
import { FilteredOptions } from '../types/FilteredOptions';
import { FilterOptions } from './FilterOption';

type Props = {
  itemsLeft: () => string;
  filteredOptions: FilteredOptions[];
  filter: SelectedFilter;
  handleMassDeleteTodo: (ids: number[]) => void;
  completedTodosIds: number[];
  setFilter: React.Dispatch<SetStateAction<SelectedFilter>>;
};

export const Footer: React.FC<Props> = ({
  itemsLeft,
  filteredOptions,
  filter,
  handleMassDeleteTodo,
  completedTodosIds,
  setFilter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft()}
      </span>

      <nav className="filter" data-cy="Filter">
        {filteredOptions.map(option => (
          <FilterOptions
            key={option.type}
            option={option}
            filter={filter}
            setFilter={setFilter}
          />
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => handleMassDeleteTodo(completedTodosIds)}
        style={{
          visibility: !completedTodosIds.length ? 'hidden' : 'visible',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
