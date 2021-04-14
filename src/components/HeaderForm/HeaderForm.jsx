import React from 'react';
import PropTypes from 'prop-types';

export const HeaderForm = (
  {
    submitForm,
    enterNewTitle,
    addNewTitle,
    inputTitle,
  },
) => (
  <form
    onSubmit={submitForm}
  >
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      value={inputTitle}
      onChange={enterNewTitle}

      onKeyDown={addNewTitle}
    />
  </form>
);

HeaderForm.propTypes = PropTypes.shape({
  submitForm: PropTypes.func.isRequired,
  enterNewTitle: PropTypes.func.isRequired,
  addNewTitle: PropTypes.func.isRequired,
  inputTitle: PropTypes.string.isRequired,
}).isRequired;
