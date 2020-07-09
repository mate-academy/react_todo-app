import React from 'react';
import { TodoListShape } from '../../Shapes';
import { Todo } from '../Todo/Todo';

export const TodoList = (props) => {
  const { todos, checkedTodo, deleteTodo } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          id={todo.id}
          completed={todo.completed}
          title={todo.title}
          checkedTodo={checkedTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = TodoListShape.isRequired;
