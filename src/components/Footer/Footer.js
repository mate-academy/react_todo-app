import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {

      ActiveBtn: this.props.filterTypes.all,
    };
  }

  render() {
    const { ActiveBtn } = this.state;
    const { length,
      TodosDone,
      setFilters,
      filterTypes,
      clearCompleted } = this.props;

    const filterButtons = Object.values(filterTypes).map(item => (
      <li key={item}>
        <a
          className={ActiveBtn === item ? 'selected' : ''}
          href="./#"
          onClick={() => {
            setFilters(item);
            this.setState({
              ActiveBtn: item,
            });
          }}
        >
          {item}
        </a>
      </li>
    ));

    return (

      <div>
        {length > 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {length - TodosDone()}
              : items not finished
              <br />

            </span>

            <ul className="filters">
              {filterButtons}
            </ul>
            {TodosDone() > 0 && (
              <button
                id="clearCompleted"
                onClick={() => {
                  clearCompleted();
                }}
                type="button"
                className="clear-completed"
              >
              Clear completed
              </button>
            ) }
          </footer>
        )
        }
      </div>
    );
  }
}
Footer.propTypes = {
  length: PropTypes.number.isRequired,
  TodosDone: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filterTypes: PropTypes.objectOf(PropTypes).isRequired,
  clearCompleted: PropTypes.func.isRequired,

};
