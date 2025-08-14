import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../context/context';

type Props = {
  value: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  titleField: React.RefObject<HTMLInputElement>;
  toggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  value,
  handleSubmit,
  setValue,
  titleField,
  toggleAll,
}) => {
  const todos = useContext(TodosContext);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(x => x.completed === true),
          })}
          data-cy="ToggleAllButton"
          onClick={() => toggleAll()}
        />
      )}

      <form onSubmit={e => handleSubmit(e)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => setValue(e.target.value)}
          ref={titleField}
          // disabled={isLoading}
        />
      </form>
    </header>
  );
};
