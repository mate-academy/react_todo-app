import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  state = { selectedIndex: 0 };

  render() {
    // eslint-disable-next-line react/prop-types
    const { filters, list, clearCompleted } = this.props;
    const { selectedIndex } = this.state;

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
        items left&nbsp;
          {list.filter(item => item.completed === false).length}
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
                  this.setState({
                    selectedIndex: i,
                  });
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
          onClick={clearCompleted}
          style={list.filter(task => task.completed).length > 0
            ? { display: 'block' }
            : { display: 'none' }
          }
        >
          Clear completed
        </button>
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
