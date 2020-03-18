import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = React.memo((props) => {
  const { todos, onTodoToggle, onTodoRemove, onTodoTextUpdate } = props;

  return (
    <ul className="todo-list">
      {todos.map((todo, index) => {
        const { id, title, completed } = todo;

        return (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
            index={index}
            onToggle={() => onTodoToggle(id)}
            onRemove={() => onTodoRemove(id)}
            onUpdate={onTodoTextUpdate}
          />
        );
      })}
    </ul>
  );
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  })),
  onTodoToggle: PropTypes.func.isRequired,
  onTodoRemove: PropTypes.func.isRequired,
  onTodoTextUpdate: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [{
    completed: false,
  }],
};
