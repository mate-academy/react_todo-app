import React from 'react';

const filters = [
  { path: '#/', name: 'All', value: 0 },
  { path: '#/active', name: 'Active', value: 1 },
  { path: '#/completed', name: 'Completed', value: 2 },
];

// eslint-disable-next-line react/prefer-stateless-function
class TodosFilter extends React.Component {
  render() {
    const { changeFilter, filter } = this.props;

    return (
      <ul className="filters">
        {filters.map(item => (
          <li key={item.path}>
            <a
              onClick={changeFilter(item.value)}
              href={item.path}
              className={filter === item.value ? 'selected' : ''}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

export default TodosFilter;
