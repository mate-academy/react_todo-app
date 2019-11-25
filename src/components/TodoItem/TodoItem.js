import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {
  return (
    <li className="">
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={props.item.id}
          checked={props.item.completed}
          onChange={props.handleChecked}
        />
        <label htmlFor={props.item.id}>{props.item.body}</label>
        <button
          type="button"
          className="destroy"
          data-button-id={props.item.id}
          onClick={props.handleDestroy}
        />
      </div>
    </li>
  );
}

TodoItem.defaultProps = {
  item: {},
  handleChecked: {},
  handleDestroy: {},
};

TodoItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  handleChecked: PropTypes.func,
  handleDestroy: PropTypes.func,
};

export default TodoItem;
