import React from 'react';
import { Todo } from '../Todo/Todo';
import { TodoListShape } from '../Shape';

export const TodoList = ({ todos, check, filter, deleteTodo }) => {
  let FilterTodos = [];

  switch (filter) {
    case 'All':
      FilterTodos = todos;
      break;
    case 'Active':
      FilterTodos = todos.filter(todo => !todo.isCompleted);
      break;
    case 'Completed':
      FilterTodos = todos.filter(todo => todo.isCompleted);
      break;
    default:
      return false;
  }

  return (
    <ul className="todo-list">
      {
        FilterTodos.map(todo => (
          <li key={todo.id} className={todo.isCompleted ? 'completed' : ''}>
            <Todo
              todo={todo}
              check={check}
              deleteTodo={deleteTodo}
            />
          </li>
        ))
      }
    </ul>
  );
};

TodoList.propTypes = TodoListShape;
