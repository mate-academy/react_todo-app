import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  amountOfActiveTodos: number,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  handleAddTodo: (event: React.FormEvent<HTMLFormElement>) => void,
  handleUpdateStatusTodos: () => void,
  deletedTodosId: number[] | [],
  todos: Todo[] | [],
  formInputRef: React.RefObject<HTMLInputElement>
};

export const Header: React.FC<Props> = ({
  amountOfActiveTodos,
  value,
  setValue,
  handleAddTodo,
  handleUpdateStatusTodos,
  deletedTodosId,
  todos,
  formInputRef,
}) => (
  <header className="todoapp__header">
    {!!todos.length && (
      <button
        aria-label="none"
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          {
            active: !amountOfActiveTodos,
          },
        )}
        onClick={handleUpdateStatusTodos}
      />
    )}

    <form onSubmit={handleAddTodo}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!!deletedTodosId.length}
        ref={formInputRef}
      />
    </form>
  </header>
);
