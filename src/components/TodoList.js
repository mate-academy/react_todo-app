import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, filter, onComplete, onRemove }) => (
  <ul className="todo-list">
    {todos
      .filter((todo) => {
        window.console.log(`filtering only ${filter}`);
        switch (filter) {
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          case 'all':
          default:
            return true;
        }
      })
      .map(todo => (
        <TodoItem
          id={todo.id}
          key={todo.id}
          title={todo.title}
          onComplete={onComplete}
          onRemoveItem={onRemove}
          completed={todo.completed}
        />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      todo: PropTypes.objectOf(),
    }),
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
export default TodoList;
