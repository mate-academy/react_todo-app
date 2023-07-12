import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

type Props = {
  areAllTodosCompleted: boolean,
  isToggleAllButtonVisible: boolean,
  showErrorMessage: (message: string) => void,
  onEnterKeyPress: (todoTitle: string) => void,
  onToggleAllButtonClick: () => void,
};

export const TodoHeader: React.FC<Props> = React.memo(({
  areAllTodosCompleted,
  isToggleAllButtonVisible,
  showErrorMessage,
  onEnterKeyPress,
  onToggleAllButtonClick,
}) => {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;

    setTitle(inputElement.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      showErrorMessage('Title can\'t be empty');

      return;
    }

    onEnterKeyPress(normalizedTitle);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {isToggleAllButtonVisible && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllTodosCompleted,
          })}
          onClick={onToggleAllButtonClick}
          aria-label={areAllTodosCompleted
            ? 'Uncheck all todos'
            : 'Check all todos'}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          ref={inputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
});
