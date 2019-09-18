import React from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';
import { TodoListTypes } from '../../constants/proptypes';

const TodoList = ({ todoList, removeTodo, switchCompleted }) => (
  <ul className="todo-list">
    {todoList.map(todo => (
      <TodoItem
        key={todo.id}
        htmlFor={`todo-${todo.id}`}
        removeTodo={removeTodo}
        switchCompleted={switchCompleted}
        {...todo}
      />
    ))}
  </ul>
);

TodoList.propTypes = TodoListTypes;

export default TodoList;
