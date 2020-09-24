import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = (
  { deleteTodo,
    todos,
    todoStatusToggle,
    editTodoTitle },
) => {
  if (!todos) {
    return null;
  }

  return (
    <ul className="todo-list">
      {todos
        .map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            todoStatusToggle={todoStatusToggle}
            editTodoTitle={editTodoTitle}
          />
        ))}
    </ul>
  );
};

TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  todoStatusToggle: PropTypes.func.isRequired,
  editTodoTitle: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object.isRequired),
};
TodoList.defaultProps = {
  todos: [],
};
