import React from 'react';
import PropTypes from 'prop-types';

const TodosFilter = ({ idFiltres, setIdFiltres, filtersList }) => (
  <ul className="filters">
    {filtersList.map(item => (
      <li key={item.title}>
        <a
          href="#/"
          className={idFiltres === item.id ? 'selected' : ''}
          id={item.id}
          onClick={() => setIdFiltres(item.id)}
        >
          {item.title}
        </a>
      </li>
    ))}
  </ul>
);

TodosFilter.propTypes = {
  idFiltres: PropTypes.string.isRequired,
  setIdFiltres: PropTypes.func.isRequired,
  filtersList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodosFilter;
