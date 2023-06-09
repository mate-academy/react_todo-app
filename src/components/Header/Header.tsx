import classNames from 'classnames';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  hasSomeTodos: boolean,
  onChangeIsError: (e: Errors) => void,
  onSubmitAddTodo: (value: string) => void,
  onChangeTitle: (value: string) => void,
  titleTodo: string,
  onToggleAll: () => void,
};

export const Header: React.FC<Props> = ({
  todos,
  hasSomeTodos,
  onChangeIsError,
  onSubmitAddTodo,
  titleTodo,
  onChangeTitle,
  onToggleAll,
}) => {
  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onSubmitAddTodo(titleTodo.trimStart());
    } catch {
      onChangeIsError(Errors.ADD);
    }
  };

  return (
    <header className="todoapp__header">
      {hasSomeTodos && (
      // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={classNames('todoapp__toggle-all',
            { active: todos.every(todo => !todo.completed) })}
          onClick={onToggleAll}
        />
      )}

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={titleTodo}
          onChange={(e) => (onChangeTitle(e.target.value))}
        />
      </form>
    </header>
  );
};
