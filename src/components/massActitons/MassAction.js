import React from 'react';
import PropTypes from 'prop-types';

function MassAction({ action }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label onClick={action}>Mark all as complete</label>
  );
}

MassAction.propTypes = {
  action: PropTypes.func.isRequired,
};

export default MassAction;
