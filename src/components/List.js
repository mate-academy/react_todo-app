import React from 'react';
import Item from './Item';

function List(
  {
    items,
    toggleOne,
    toggleAll,
    selectedTab,
    clearItem,
  }
) {
  let filteredItems = [];

  switch (selectedTab) {
    case 'All':
      filteredItems = [...items];
      break;

    case 'Active':
      filteredItems = [...items]
        .filter(item => !item.completed);
      break;

    case 'Completed':
      filteredItems = [...items]
        .filter(item => item.completed);
      break;

    default:
  }

  if (items.length) {
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
              <Item
                item={item}
                key={item.id}
                toggleOne={toggleOne}
                clearItem={clearItem}
              />
            ))}
          </ul>
        </section>
      </>
    );
  }

  return '';
}

export default List;
