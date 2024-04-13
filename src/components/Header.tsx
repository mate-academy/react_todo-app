import classNames from 'classnames';
import { Todo } from '../types/types';

type Props = {
  todos: Todo[];
  inputValue: string;
  setInputValue: (prop: string) => void;
  isAllCompleted: boolean;
  completeAllHandler: () => void;
  formSubmitHandler: (event: React.FormEvent) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  inputValue,
  setInputValue,
  isAllCompleted,
  completeAllHandler,
  formSubmitHandler,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={completeAllHandler}
        />
      )}

      <form onSubmit={formSubmitHandler}>
        <input
          data-cy="NewTodoField"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    </header>
  );
};
