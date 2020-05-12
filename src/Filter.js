import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const {
    filter,
    changeVisibleList,
    currentFilter,
  } = props;

  return (
    <a
      href={`#/${filter}`}
      className={cn({
        selected: currentFilter === filter,
      })}
      onClick={() => changeVisibleList(filter)}
    >
      {filter}
    </a>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  changeVisibleList: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};
