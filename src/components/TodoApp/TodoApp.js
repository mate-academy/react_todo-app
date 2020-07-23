import React from 'react';
import { PropTypes } from 'prop-types';
import { TodosList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Header } from '../Header/Header';
import './TodoApp.css';

export const TodoApp = (props) => {
  const {
    todos,
    activeTodos,
    filter,
    onStatus,
    onRemove,
    onSaveEdit,
    onStatusAll,
    onFilter,
    onRemoveCompleted,
    onSaveInput,
  } = props;

  return (
    <section className="todoapp">
      <Header
        onSaveInput={onSaveInput}
      />

      <section className="todoapp__main">
        <input
          type="checkbox"
          id="toggle-all"
          className="todoapp__toggle-all"
          onChange={onStatusAll}
        />
        <label
          htmlFor="toggle-all"
          className="todoapp__mark"
        >
          Mark all as complete
        </label>
        <TodosList
          todos={todos}
          filter={filter}
          onStatus={onStatus}
          onRemove={onRemove}
          onSaveEdit={onSaveEdit}
        />
      </section>

      {
        todos.length
          ? (
            <TodosFilter
              activeTodos={activeTodos}
              onFilter={onFilter}
              filter={filter}
              onRemoveCompleted={onRemoveCompleted}
            />
          )
          : (null)
      }
    </section>
  );
};

TodoApp.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  activeTodos: PropTypes.number.isRequired,
  onStatus: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onStatusAll: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onRemoveCompleted: PropTypes.func.isRequired,
  onSaveInput: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
