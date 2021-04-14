import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HeaderForm } from '../HeaderForm';

export const Header = ({ onSubmit, newId, todosLength }) => {
  const [newTodo, setNewTodo] = useState({});
  const [inputTitle, setInputTitle] = useState('');
  const [appliedTitle, setAppliedTitle] = useState('');

  const debounce = (f, delay) => {
    let timeId;

    return (...args) => {
      clearTimeout(timeId);
      timeId = setTimeout(f, delay, ...args);
    };
  };

  const applyQuerry = useCallback(debounce(setAppliedTitle, 100), []);

  const submitForm = (event) => {
    event.preventDefault();

    if (inputTitle.length > 0) {
      onSubmit(newTodo);
      setInputTitle('');
    }
  };

  const enterNewTitle = (event) => {
    setInputTitle(event.target.value);
    applyQuerry(event.target.value);
  };

  const addNewTitle = (event) => {
    if (event.key === 'Enter') {
      setNewTodo({
        id: newId,
        title: appliedTitle,
        completed: false,
      });
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <HeaderForm
        submitForm={submitForm}
        enterNewTitle={enterNewTitle}
        addNewTitle={addNewTitle}
        inputTitle={inputTitle}
      />

    </header>
  );
};

Header.propTypes = PropTypes.shape({
  onSubmit: PropTypes.func.isRequired,
  newId: PropTypes.number.isRequired,
}).isRequired;
