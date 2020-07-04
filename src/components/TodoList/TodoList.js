import React from 'react';
import { TodoListShape } from '../../Shapes';
import { Todo } from '../Todo/Todo';

export const TodoList = (props) => {
  const { todos, checkedTodo, deleteTodo } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={`${todo.completed ? `completed` : ''}`}>
          <Todo
            todo={todo}
            checkedTodo={checkedTodo}
            deleteTodo={deleteTodo}
          />
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = TodoListShape.isRequired;
