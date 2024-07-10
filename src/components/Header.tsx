import React, { useContext } from 'react';
import { Form } from './Form';
import { TodosStateContext } from '../providers/TodosProvider';

export const Header = () => {
  const { dispatch } = useContext(TodosStateContext);

  const addTodo = (value: string) => {
    dispatch({ type: 'add', payload: value });
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <Form className="todoapp__new-todo" onSubmit={addTodo} />
    </header>
  );
};
