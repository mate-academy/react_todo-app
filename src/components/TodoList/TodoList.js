import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = (props) => {
  const {
    todos,
    toggleItem,
    onDelete,
    onTextChanged,
  } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          toggleItem={toggleItem}
          onDelete={onDelete}
          onTextChanged={onTextChanged}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: arrayOf(PropTypes.shape({
    id: PropTypes.string,
    done: PropTypes.bool,
    text: PropTypes.string,
  })).isRequired,
  toggleItem: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onTextChanged: PropTypes.func.isRequired,
};
