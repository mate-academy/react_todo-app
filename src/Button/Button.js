import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Button.css';

export const Button = (props) => {
  const {
    activeTodos,
    setFilter,
    status,
    title,
  } = props;

  return (
    <button
      type="button"
      className={classNames('footer__button', {
        active: activeTodos === status,
      })}
      onClick={() => setFilter(status)}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  activeTodos: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
