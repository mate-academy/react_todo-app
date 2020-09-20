import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({
  todoList,
  setTodoList,
  filteredTodos,
}) => (
  <ul className="todo-list">
    {filteredTodos.map(item => (
      <TodoItem
        key={item.id}
        item={item}
        setTodoList={setTodoList}
        todoList={todoList}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTodoList: PropTypes.func.isRequired,
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
