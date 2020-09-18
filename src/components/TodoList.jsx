import React from 'react';
import PropTypes, { object } from 'prop-types';

import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  changeCompleted,
  deleteTodo,
  editingTodo,
}) => {
  const complete = (id) => {
    changeCompleted(id);
  };

  const todoWasEdited = (id, newTodo) => {
    editingTodo(id, newTodo);
  };

  return (
    <ul className="todo-list">
      {todos.map(item => (
        <TodoItem
          todo={item}
          key={item.id}
          complete={complete}
          onDelete={deleteTodo}
          todoWasEdited={todoWasEdited}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editingTodo: PropTypes.func.isRequired,
};
