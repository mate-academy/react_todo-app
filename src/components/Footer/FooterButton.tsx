import { FC } from 'react';

interface IProps {
  deleteCompletedTodos: () => void;
  numberComplete: number;
}

export const FooterButton: FC<IProps> = ({
  numberComplete,
  deleteCompletedTodos = () => {},
}) => {
  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={numberComplete === 0}
      onClick={deleteCompletedTodos}
    >
      Clear completed
    </button>
  );
};
