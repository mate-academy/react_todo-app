import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ href, text }) => (
  <li>
    <a
      href={href}
      target={text}
    >
      {text}
    </a>
  </li>
);

TodosFilter.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TodosFilter;
