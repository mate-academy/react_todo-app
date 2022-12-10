import React, { useEffect, useState } from 'react';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>;
  isAdding: boolean;
  onErrorMessage: (message: string) => void;
  handleAddTodo: (title: string) => void;
};

export const NewTodoField: React.FC<Props> = React.memo(({
  newTodoField,
  isAdding,
  onErrorMessage,
  handleAddTodo,
}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [isAdding]);

  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      onErrorMessage('Title can\'t be empty');

      return;
    }

    handleAddTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="createTodo"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={newTodoField}
        disabled={isAdding}
        value={title}
        onChange={handleInputField}
      />
    </form>
  );
});
