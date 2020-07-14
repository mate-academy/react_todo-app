import React from 'react';
import TodoItem from './TodoItem';
import { TodoListShape } from '../Shapes';

const TodoList = ({ todos, onCheck, onDelete }) => (
  <ul className="todo-list">
    {todos.map(todoItem => (
      <TodoItem
        todo={todoItem}
        key={todoItem.id}
        onCheck={onCheck}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

TodoList.propTypes = TodoListShape.isRequired;

export default TodoList;
