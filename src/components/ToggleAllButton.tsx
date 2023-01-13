import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  visibleTodos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const ToggleAllButton: FC<Props> = ({
  visibleTodos,
  setTodos,
}) => {
  const isToggleAllActive = visibleTodos.every(x => x.completed);

  const handleToggleAll = () => {
    setTodos((prev: Todo[]) => {
      return prev.map(el => {
        const currentTodo = el;

        currentTodo.completed = !isToggleAllActive;

        return currentTodo;
      });
    });
  };

  return (
    <button
      aria-label="toggle"
      data-cy="ToggleAllButton"
      type="button"
      className={classNames(
        'todoapp__toggle-all',
        { active: isToggleAllActive },
      )}
      onClick={handleToggleAll}
    />
  );
};
