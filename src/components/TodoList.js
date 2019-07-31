import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, changeTodoCompleted, destroyTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        changeTodoCompleted={changeTodoCompleted}
        destroyTodo={destroyTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  destroyTodo: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeTodoCompleted: PropTypes.func.isRequired,
};

export default TodoList;
