/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { FC } from 'react';
import { NewToDoField } from '../NewToDoField';

type Props = {
  newTodoTitle: string;
  onTitleChange: (value: string) => void;
  onToDoAdd: (e: React.FormEvent) => void;
  isAdding: boolean;
  isButtonActive: boolean;
  onToggleAll: (value: boolean) => void;
};

export const Header: FC<Props> = ({
  newTodoTitle,
  onTitleChange,
  onToDoAdd,
  isAdding,
  isButtonActive,
  onToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className={classNames(
          'todoapp__toggle-all',
          { active: isButtonActive },
        )}
        onClick={() => onToggleAll(isButtonActive)}
      />

      <NewToDoField
        title={newTodoTitle}
        onTitleChange={onTitleChange}
        onToDoAdd={onToDoAdd}
        isAdding={isAdding}
      />
    </header>
  );
};
