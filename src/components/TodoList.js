import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import ControlPanel from './ControlPanel';

function TodoList(
  {
    items,
    toggleOne,
    toggleAll,
    handleFilter,
    selectedTab,
    clearItem,
    clearCompleted,
  }
) {
  let filteredItems = [];

  if (selectedTab === 'All') {
    filteredItems = [...items];
  } else if (selectedTab === 'Active') {
    filteredItems = [...items]
      .filter(item => !item.completed);
  } else if (selectedTab === 'Completed') {
    filteredItems = [...items]
      .filter(item => item.completed);
  }

  if (items.length > 0) {
    return (
      <>
        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {filteredItems.map(item => (
              <TodoItem
                item={item}
                key={item.id}
                toggleOne={toggleOne}
                clearItem={clearItem}
              />
            ))}
          </ul>
        </section>
        <ControlPanel
          items={items}
          handleFilter={handleFilter}
          clearCompleted={clearCompleted}
        />
      </>
    );
  }

  return '';
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleOne: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  clearItem: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default TodoList;
