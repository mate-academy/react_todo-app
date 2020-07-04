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

  const completedTodos = todos.filter(todo => todo.completed);
  const uncompletedTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${uncompletedTodos.length} items left`}
      </span>
      <TodosFilter
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      {completedTodos.length > 0 && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompleted()}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = FooterShape.isRequired;
