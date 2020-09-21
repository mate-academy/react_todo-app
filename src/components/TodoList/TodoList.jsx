import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ items, setTodos, setActiveCount, activeCount }) => {
  const changeStatus = (id) => {
    setTodos([...items].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }

      return item;
    }));

    setActiveCount(items.find(item => item.id === id).completed
      ? activeCount + 1
      : activeCount - 1);
  };

  const changeAll = (value, todoItems) => {
    if (value) {
      setTodos(todoItems.map(item => ({ ...item, completed: true })));
      setActiveCount(0);
    } else {
      setTodos(todoItems.map(item => ({ ...item, completed: false })));
      setActiveCount(items.length);
    }
  };

  const removeItem = (id) => {
    setTodos(items.filter(item => item.id !== id));
    setActiveCount(items.find(item => item.id).completed
      ? activeCount
      : activeCount - 1);
  };

  const editTitle = (value, editId) => {
    setTodos(items.map((item) => {
      if (item.id === editId) {
        return { ...item, title: value };
      }

      return item;
    }));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        readOnly
        checked={activeCount === 0 && items.length}
        onChange={({ target }) => changeAll(target.checked, items)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {items.map(item => (
          <li key={item.id}>
            <input
              type="text"
              className="edit"
            />
          </li>
        ))}

        <TodoItem
          items={items}
          editTitle={editTitle}
          changeStatus={changeStatus}
          removeItem={removeItem}
        />
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  setActiveCount: PropTypes.func.isRequired,
  activeCount: PropTypes.number.isRequired,
};
