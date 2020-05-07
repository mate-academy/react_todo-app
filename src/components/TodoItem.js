import React from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  state= {
    titleInList: this.props.title,
  }

  render() {
    const { title, id } = this.props;
    const { titleInList } = this.state;

    return (
      <li>
        <form>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={id}
            />
            <label
              htmlFor="todo-1"
            >
              {title}
              {id}
            </label>
            <button
              type="button"
              className="destroy"
            />
          </div>
          <input
            type="text"
            className="edit"
            value={titleInList}
          />
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
