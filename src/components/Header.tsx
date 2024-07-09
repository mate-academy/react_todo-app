import cn from 'classnames';
import { Todo } from '../types/Todo';
import { SetStateAction } from 'react';
import { MainInput } from './MainInput';

type Props = {
  completedTodosIds: number[];
  todos: Todo[];
  handleToogleButton: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  mainInputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({
  completedTodosIds,
  todos,
  handleToogleButton,
  handleSubmit,
  query,
  setQuery,
  mainInputRef,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: completedTodosIds.length === todos.length,
        })}
        data-cy="ToggleAllButton"
        onClick={handleToogleButton}
      />

      <MainInput
        handleSubmit={handleSubmit}
        query={query}
        setQuery={setQuery}
        mainInputRef={mainInputRef}
      />
    </header>
  );
};
