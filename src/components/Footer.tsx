import React from 'react';
import { Filter } from './Filter';
import { FilterType } from '../types/FilterType';

type Props = {
  selected: FilterType;
  counter: number;
  isClearButton: boolean;
  onSelect: (filter: FilterType) => void;
  onDelete: () => void;
};

export const Footer: React.FC<Props> = ({
  selected,
  counter,
  isClearButton,
  onSelect,
  onDelete,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter} items left
      </span>

      <Filter selected={selected} onSelect={onSelect} />

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onDelete}
        disabled={!isClearButton}
      >
        Clear completed
      </button>
    </footer>
  );
};
