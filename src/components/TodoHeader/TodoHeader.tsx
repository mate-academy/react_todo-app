import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { TyChangeEvtInputElmt } from '../../types/General';

export const TodoHeader: React.FC = React.memo((
) => {
  const [value, setValue] = useState('');
  const {
    addTodo,
  } = useContext(TodosContext);

  // #region HANDLER
  const handleInputChange = (event: TyChangeEvtInputElmt) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimedValue = value.trim();

    if (trimedValue === '') {
      return;
    }

    addTodo({
      id: +new Date(),
      title: trimedValue,
      completed: false,
    });
    setValue('');
  };
  // #endregion

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleInputChange}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
});
