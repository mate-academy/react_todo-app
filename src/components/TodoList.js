import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onTaskCompleted, onRemove }) => (
  <ul className="todo-list">
    {todos
      .map(todo => (
        <TodoItem
          id={todo.id}
          key={todo.id}
          title={todo.title}
          onTaskCompleted={onTaskCompleted}
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
      todo: PropTypes.objectOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  onTaskCompleted: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
export default TodoList;
