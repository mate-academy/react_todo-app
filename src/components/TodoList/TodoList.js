import React from 'react';
import PropTypes from 'prop-types';

const TodoList = (
  {
    items,
    filter,
    changeCompleted,
    isToggledAll,
    changeAllCompleted,
    removeTodo,
  },
) => {
  const onToggle = (id) => {
    changeCompleted(id);
  };

  const onFiltered = (arr) => {
    if (filter === 'All') {
      return arr;
    }

    if (filter === 'Active') {
      return arr.filter(el => !el.completed);
    }

    if (filter === 'Completed') {
      return arr.filter(el => el.completed);
    }

    return null;
  };

  const onRemove = (event) => {
    removeTodo(+event.target.id);
  };

  return (
    <section className="main">
      {!!items.length && (
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={isToggledAll}
          onChange={() => changeAllCompleted()}
        />
      )}

      {!!items.length && (
        <label htmlFor="toggle-all">Mark all as complete</label>
      )}

      <ul className="todo-list">
        {onFiltered(items).length === 0
        || onFiltered(items).map(el => (
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
                onChange={() => onToggle(el.id)}
              />
              <label htmlFor={`todo-${el.id}`}>{el.title}</label>
              <button
                type="button"
                className="destroy"
                id={el.id}
                onClick={onRemove}
              />
            </div>
            <input type="text" className="edit" />
          </li>
        ))}
      </ul>
    </section>
  );
};

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
  isToggledAll: PropTypes.bool.isRequired,
  changeAllCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
