import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const Footer = (props) => {
  const { todosList,
    clearCompletedTodo,
    changeVisibleList,
    currentFilter,
    hideClearButton }
    = props;

  return (
    <>
      <footer className="footer">
        <span className="todo-count">
          {`${todosList.filter(todo => !todo.completed).length} items left`}

        </span>
        <TodosFilter
          currentFilter={currentFilter}
          changeVisibleList={changeVisibleList}
          clearCompletedTodo={clearCompletedTodo}
          hideClearButton={hideClearButton}
        />
      </footer>

    </>
  );
};

export default Footer;

Footer.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeVisibleList: PropTypes.func.isRequired,
  clearCompletedTodo: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  hideClearButton: PropTypes.bool.isRequired,
};
