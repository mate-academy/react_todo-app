import { SetStateAction } from 'react';

type Props = {
  handleSubmit: (event: React.FormEvent) => void;
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  mainInputRef: React.RefObject<HTMLInputElement>;
};

export const MainInput: React.FC<Props> = ({
  handleSubmit,
  query,
  setQuery,
  mainInputRef,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={mainInputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  );
};
