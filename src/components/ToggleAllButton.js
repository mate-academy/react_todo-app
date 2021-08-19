import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../redux/actions';

const ToggleAllButton = ({ toggleAllValue, toggleAll }) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={!toggleAllValue}
      onClick={() => toggleAll(toggleAllValue)}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </>
);

ToggleAllButton.propTypes = {
  toggleAllValue: PropTypes.bool.isRequired,
  toggleAll: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  toggleAllValue: state.todos.todos.some(
    todo => !todo.completed,
  ),
});

const mapActionsToProps = { toggleAll: actions.toggleAll };

export default connect(mapStateToProps, mapActionsToProps)(ToggleAllButton);
