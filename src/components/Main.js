import React from 'react';
import PropTypes from 'prop-types';
import TodoItems from './TodoItems';

function Main(props) {
  const todoItems = (
    <TodoItems
      sortState={props.sortState}
      todoItemsArr={props.todoItemsArr}
      sortedTodoItemsArr={props.sortedTodoItemsArr}

      handleCompletedOrDestroy={props.handleCompletedOrDestroy}
      rewriteExistingTodo={props.rewriteExistingTodo}
    />
  );

  return (
    <section className="main" style={{ display: 'block' }}>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={props.allCompleted}
        onChange={props.handleAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todoItems}
      </ul>
    </section>
  );
}

Main.propTypes = {
  todoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortedTodoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortState: PropTypes.string.isRequired,

  handleCompletedOrDestroy: PropTypes.func.isRequired,
  rewriteExistingTodo: PropTypes.func.isRequired,

  handleAllCompleted: PropTypes.func.isRequired,
  allCompleted: PropTypes.bool.isRequired,
};

export default Main;
