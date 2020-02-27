import React from 'react';
import PropTypes from 'prop-types';

import './Stats.css';

const Stats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const uncompleted = total - completed;

  return (
    <table className="stats">
      <tbody>
        <tr>
          <th>Total tasks:</th>
          <td>{total}</td>
        </tr>
        <tr>
          <th>Completed:</th>
          <td>{completed}</td>
        </tr>
        <tr>
          <th>Left:</th>
          <td>{uncompleted}</td>
        </tr>
      </tbody>
    </table>
  );
};

Stats.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export default Stats;
