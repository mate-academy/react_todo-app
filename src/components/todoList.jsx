import React from 'react';
import PropTypes from 'prop-types';
import { commonProps, todoShape } from './props';
import { TodoItem } from './todoItem';

export const TodoList = ({
  todos,
  toggleAll,
  changeToggle,
  destroyTodo,
  filter,
  changeTitle,
}) => (
  <>
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        toggleAll={toggleAll}
        changeToggle={changeToggle}
        destroyTodo={destroyTodo}
        filter={filter}
        changeTitle={changeTitle}
      />
    ))}
  </>
);
TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoShape.isRequired).isRequired,
  ...commonProps,
};
