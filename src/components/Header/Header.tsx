import { ChangeEvent, FormEvent } from 'react';
import { Todo } from '../../types/Todo';
import { createTodo } from '../../utils/helper';

type HeaderProps = {
  inputValue: string,
  onInputChange: (query: string) => void;
  onFormSubmit: (todo: Todo) => void;
};

export const Header: React.FC<HeaderProps> = ({
  inputValue,
  onInputChange,
  onFormSubmit,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onFormSubmit(createTodo(inputValue));
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
