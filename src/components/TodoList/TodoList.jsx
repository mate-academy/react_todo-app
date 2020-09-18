import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Todo } from '../Todo';

export const TodoList = ({ changeProperty, todosTools, todos }) => {
  const [todoEdited, changeStatusEdit] = useState(null);

  return (
    <ul className="todo-list">
      {
        todos.map(todo => (
          <li
            key={todo.id}
            className={ClassNames(
              { completed: todo.completed },
              { editing: todoEdited === todo.id },
            )}
          >
            <Todo
              todo={{ ...todo }}
              changeProperty={changeProperty}
              editTitleTools={[todoEdited, changeStatusEdit]}
              todosTools={todosTools}
            />
          </li>
        ))
      }
    </ul>
  );
};

TodoList.propTypes = {
  changeProperty: PropTypes.func.isRequired,
  todosTools: PropTypes.objectOf(PropTypes.any).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
