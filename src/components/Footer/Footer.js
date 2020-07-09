import React from 'react';
import { FooterShape } from '../../Shapes';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const Footer = (props) => {
  const {
    todos,
    clearCompleted,
    setActiveTab,
    activeTab,
  } = props;

  const completedLength = todos.filter(todo => todo.completed).length;
  const uncompletedLength = todos.length - completedLength;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${uncompletedLength} items left`}
      </span>
      <TodosFilter
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {completedLength > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = FooterShape.isRequired;
