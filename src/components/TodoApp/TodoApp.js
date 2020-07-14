import React from 'react';
import { PropTypes } from 'prop-types';
import { TodosList } from './TodoList/TodoList';
import { TodosFilter } from './TodosFilter/TodosFilter';
import { Header } from './Header/Header';
// import cn from 'classnames';

export const TodoApp = (props) => {
  const {
    todos,
    activeTodos,
    onStatus,
    onRemove,
    onStatusAll,
  } = props;

  return (
    <section className="todoapp">
      <Header />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={onStatusAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodosList
          todos={todos}
          onStatus={onStatus}
          onRemove={onRemove}
        />
      </section>

      <TodosFilter
        activeTodos={activeTodos}
      />
    </section>
  );
};

TodoApp.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  activeTodos: PropTypes.number.isRequired,
  onStatus: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onStatusAll: PropTypes.func.isRequired,
};
