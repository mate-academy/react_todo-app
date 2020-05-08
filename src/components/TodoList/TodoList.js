import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  handleAllToggle = () => {
    this.props.changeAllCompleted();
  };

  handleToggle = (id) => {
    this.props.changeCompleted(id);
  };

  filt = (arr) => {
    if (this.props.filter === 'All') {
      return arr;
    }

    if (this.props.filter === 'Active') {
      return arr.filter(el => !el.completed);
    }

    if (this.props.filter === 'Completed') {
      return arr.filter(el => el.completed);
    }

    return null;
  };

  handleRemove = (event) => {
    this.props.remove(+event.target.id);
  };

  render() {
    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={this.props.toggleAll}
          onChange={this.handleAllToggle}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {this.filt(this.props.items).length === 0
          || this.filt(this.props.items).map(el => (
            <li
              key={el.id}
              className={el.completed ? 'completed' : ''}
            >
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  id={`todo-${el.id}`}
                  checked={el.completed}
                  onChange={() => this.handleToggle(el.id)}
                />
                <label htmlFor={`todo-${el.id}`}>{el.title}</label>
                <button
                  type="button"
                  className="destroy"
                  id={el.id}
                  onClick={this.handleRemove}
                />
              </div>
              <input type="text" className="edit" />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default TodoList;

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  filter: PropTypes.string.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  toggleAll: PropTypes.bool.isRequired,
  changeAllCompleted: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
