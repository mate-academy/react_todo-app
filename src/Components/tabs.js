import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.Component {
  state = { selectedIndex: 0 };

  render() {
    const { tabs } = this.props;
    const { selectedIndex } = this.state;

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          3 items left
        </span>

        <ul className="filters">
          {tabs.map((item, i) => (
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

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object),
};

Tabs.defaultProps = {
  tabs: [],
};

export default Tabs;
