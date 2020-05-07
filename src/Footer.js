import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from './TodosFilter';

const Footer = ({ todosList, handleClearCompleted, handlerChangeList }) => (
  <>
    <footer className="footer">
      <span className="todo-count">
        {`${todosList.filter(todo => !todo.completed).length} items left`}

      </span>
      <TodosFilter
        handlerChangeList={handlerChangeList}
        handleClearCompleted={handleClearCompleted}
      />
    </footer>

  </>
);

export default Footer;

Footer.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlerChangeList: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
};
