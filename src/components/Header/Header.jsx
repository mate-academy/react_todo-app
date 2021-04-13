import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const Header = ({ onSubmit, newId }) => {
  const [newData, setNewData] = useState({});
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

  useEffect(() => {
    setNewData({
      id: newId,
      title: inputTitle,
      completed: false,
    });
  }, [appliedTitle]);

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          onSubmit(newData);
        }}
      >
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputTitle}
          onChange={(event) => {
            setInputTitle(event.target.value);
            applyQuerry(event.target.value);
          }}

          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setInputTitle('');
            }
          }}
        />
      </form>
    </header>
  );
};

Header.propTypes = PropTypes.shape({
  onSubmit: PropTypes.func.isRequired,
  newId: PropTypes.number.isRequired,
}).isRequired;
