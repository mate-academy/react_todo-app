import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  state = { selectedIndex: 0 };

  render() {
    const { filters } = this.props;
    const { selectedIndex } = this.state;

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          3 items left
        </span>

        <ul className="filters">
          {filters.map((item, i) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={i === selectedIndex
                  ? 'selected'
                  : ''}
                onClick={() => {
                  this.setState({ selectedIndex: i });
                }}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="clear-completed"
          style={{ display: 'block' }}
        />
      </footer>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
};

Filters.defaultProps = {
  filters: [],
};

export default Filters;
