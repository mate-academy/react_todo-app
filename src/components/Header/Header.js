import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

export const Header = ({ addTodo }) => {
  const { register, setValue, handleSubmit } = useForm();

  const onSubmit = (data) => {
    addTodo(data.newTodo.trim());
    setValue('newTodo', '');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="newTodo"
          ref={register({
            required: true,
            pattern: /\w+/,
          })}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
