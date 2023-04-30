import { FC } from 'react';
import classNames from 'classnames';

type Props = {
  title: string,
  setTitle: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleFormSubmit: (event: React.FocusEvent<HTMLFormElement>) => void,
  toggleCompletedAllTodo: () => void,
  countActiveTodo: number,
  hasTodos: boolean,
};

export const Header: FC<Props> = ({
  title,
  setTitle,
  handleFormSubmit,
  toggleCompletedAllTodo,
  countActiveTodo,
  hasTodos,
}) => {
  return (
    <header className="todoapp__header">
      {hasTodos
    && (
      <button
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          {
            active: countActiveTodo === 0,
          },
        )}
        onClick={toggleCompletedAllTodo}
        aria-labelledby="completedAllTodos"
      />
    )}

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={setTitle}
        />
      </form>
    </header>
  );
};
