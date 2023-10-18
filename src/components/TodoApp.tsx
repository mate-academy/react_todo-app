/* eslint-disable consistent-return */
import { FormEvent, useState } from 'react';
import { Todo } from '../types';

type Props = {
  handleAddTodo: (value: Todo) => void;
};

export const TodoApp: React.FC<Props> = ({ handleAddTodo }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const AddTodo = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (inputValue.trim() !== '') {
      const newTodo = {
        id: +new Date(),
        title: inputValue.trim(),
        completed: false,
      };

      handleAddTodo(newTodo);
    }

    setInputValue('');
  };

  return (
    <form onSubmit={AddTodo}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
};
