import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';

export const TodosForm: React.FC = () => {
  const [querry, setQuerry] = useState('');

  const { addItem } = useContext(TodosContext);

  const handleQuerryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuerry(event.target.value);
  };

  const handlePressEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    addItem(event.target.value);
    setQuerry('');
  };

  const handleBlurInput = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    addItem(event.target.value);
    setQuerry('');
  };

  return (
    <form>
      <input
        type="text"
        value={querry}
        onChange={handleQuerryChange}
        onKeyPress={handlePressEnterKey}
        onBlur={handleBlurInput}
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
