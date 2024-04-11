import classNames from 'classnames';
import { Todo } from '../types/types';

type Props = {
  todos: Todo[];
  inputValue: string;
  setInputValue: (prop: string) => void;
  isVisible: boolean;
  setIsVisible: (prop: boolean) => void;
  formSubmitHandler: (event: React.FormEvent) => void;
};

export const Header: React.FC<Props> = ({
  todos,
  inputValue,
  setInputValue,
  isVisible,
  setIsVisible,
  formSubmitHandler,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !isVisible,
          })}
          data-cy="ToggleAllButton"
          onClick={() => setIsVisible(!isVisible)}
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
