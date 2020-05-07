import React from 'react';
import cn from 'classnames/bind';
import PropTypes from 'prop-types';

const Todo = ({ id, title, completed, onSelected }) => (
// handleChecked = (event) => {
//   const id = event.target.id;
// console.log('event.target',event.target);

  //   this.props.onSelected(id);
  //   this.setState(prevState => ({
  //     completed: !prevState.completed
  //   }))
  // }

  <li className={cn({ completed: completed === true })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        id={id}
        checked={completed}
        onChange={onSelected}
      />
      <label htmlFor={id}>{title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
};

export default Todo;
