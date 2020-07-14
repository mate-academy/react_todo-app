import React from 'react';
import { PropTypes } from 'prop-types';
import { TodosList } from './TodoList/TodoList';
import { TodosFilter } from './TodosFilter/TodosFilter';
import { Header } from './Header/Header';
// import cn from 'classnames';

export const TodoApp = (props) => {
  const {
    todos,
    onStatus,
  } = props;

  return (
    <section className="todoapp">
      <Header />

      <section className="main">
        <input type="checkbox" id="toggle-all" className="toggle-all" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodosList
          todos={todos}
          onStatus={onStatus}
        />
      </section>

      <TodosFilter />
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
  onStatus: PropTypes.func.isRequired,
};
