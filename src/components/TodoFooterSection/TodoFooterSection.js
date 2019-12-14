import React from 'react';
import PropTypes from 'prop-types';
import TodoFilters from './TodoFilters';

const TodoFooterSection = (props) => {
  const {
    todoList,
    currentFilter,
    onClearedList,
    onSetFilter,
  } = props;

  const completedTodos = todoList.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${completedTodos} items left`}
      </span>

      <TodoFilters
        onFilter={onSetFilter}
        selectedFilter={currentFilter}
      />

      {todoList.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearedList}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

TodoFooterSection.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentFilter: PropTypes.string.isRequired,
  onSetFilter: PropTypes.func.isRequired,
  onClearedList: PropTypes.func.isRequired,
};

export default TodoFooterSection;
