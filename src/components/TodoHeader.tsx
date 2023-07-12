import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { getTodo } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  newTodoTitle: string;
  setNewTodoTitle: (event: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  hasUncompletedTodo: boolean;
  toggleCompleteAllTodos: () => void;
};

export const Header: React.FC<Props> = ({
  newTodoTitle,
  setNewTodoTitle,
  onSubmit,
  hasUncompletedTodo,
  toggleCompleteAllTodos,
}) => {
  const [todo, setTodo] = useState<Todo | undefined>();
  const [showToggleAll, setShowToggleAll] = useState(false);

  useEffect(() => {
    if (todo) {
      getTodo(todo.id).then(setTodo);
    }
  }, [todo]);

  useEffect(() => {
    if (hasUncompletedTodo || todo) {
      setShowToggleAll(true);
    }
  }, [hasUncompletedTodo, todo]);

  return (
    <header className="todoapp__header">
      {showToggleAll && (
        <button
          data-cy="ToggleAllButton"
          type="button"
          aria-label="Toggle All"
          className={classNames('todoapp__toggle-all', {
            active: hasUncompletedTodo,
          })}
          onClick={() => {
            toggleCompleteAllTodos();
          }}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => setNewTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
