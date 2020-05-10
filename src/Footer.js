import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const Footer = (props) => {
  const { todosList,
    handleClearCompleted,
    handlerChangeList,
    currentFilter,
    hideClearButton } = props;

  return (
    <>
      <footer className="footer">
        <span className="todo-count">
          {`${todosList.filter(todo => !todo.completed).length} items left`}

        </span>
        <TodosFilter
          currentFilter={currentFilter}
          handlerChangeList={handlerChangeList}
          handleClearCompleted={handleClearCompleted}
          hideClearButton={hideClearButton}
        />
      </footer>

    </>
  );
};

export default Footer;

Footer.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlerChangeList: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
  hideClearButton: PropTypes.bool.isRequired,
};
