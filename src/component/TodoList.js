import React from 'react';

import TodoItem from './TodoItem';

const _ = require('lodash');

const TodoList = ({
  todoListFiltered,
  toggleCompleteStatus,
  toggleRemoveTodo,
  toggleEditTodo,
  editedTodo,
  toggleCanceledEditTodo,
}) => (
  <ul className="todo-list">
    {
      todoListFiltered.map(todo => (
        <TodoItem
          todo={todo}
          toggleCompleteStatus={toggleCompleteStatus}
          toggleRemoveTodo={toggleRemoveTodo}
          toggleEditTodo={toggleEditTodo}
          editedTodo={editedTodo}
          key={_.uniqueId('todo-item_')}
        />
      ))
    }
  </ul>
);

export default TodoList;
