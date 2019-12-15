import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ idFiltres, setIdFiltres }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className={idFiltres === 'filtersAll' ? 'selected' : ''}
        id="filtersAll"
        onClick={() => setIdFiltres('filtersAll')}
      >
      All
      </a>
    </li>
    <li>
      <a
        href="#/active"
        id="filtersActiv"
        className={idFiltres === 'filtersActiv' ? 'selected' : ''}
        onClick={() => setIdFiltres('filtersActiv')}
      >
      Active
      </a>
    </li>
    <li>
      <a
        href="#/completed"
        id="filtersCompleted"
        className={idFiltres === 'filtersCompleted' ? 'selected' : ''}
        onClick={() => setIdFiltres('filtersCompleted')}
      >
      Completed
      </a>
    </li>
  </ul>
);

TodosFilter.propTypes = {
  idFiltres: PropTypes.string.isRequired,
  setIdFiltres: PropTypes.func.isRequired,
};

export default TodosFilter;
