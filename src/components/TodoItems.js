import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoItems = (props) => {
  let currentArr = props.todoItemsArr;

  if (props.sortState === 'Completed' || props.sortState === 'Active') {
    currentArr = props.sortedTodoItemsArr;
  }

  const todoItem = currentArr.map(todo => (
    <TodoItem
      todoItemsArr={props.todoItemsArr}
      todo={todo}
      key={todo.id}

      handleCompletedOrDestroy={props.handleCompletedOrDestroy}
      handleEdit={props.handleEdit}

      handleTypeEdit={props.handleTypeEdit}
      editingId={props.editingId}
      rewriteExistingTodo={props.rewriteExistingTodo}
    />
  ));

  return (todoItem);
};

TodoItems.propTypes = {
  todoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortedTodoItemsArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCompletedOrDestroy: PropTypes.func.isRequired,
  rewriteExistingTodo: PropTypes.func.isRequired,
};

export default TodoItems;
