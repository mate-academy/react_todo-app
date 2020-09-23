import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem';

export const TodoList = ({
  todos,
  deleteTodo,
  changeCompleteness,
  changeTodoTitle,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        deleteTodo={deleteTodo}
        changeCompleteness={changeCompleteness}
        changeTodoTitle={changeTodoTitle}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeCompleteness: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};
