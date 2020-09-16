import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({ todos, setTodos }) => {
  const handleCompletedChange = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return { ...todo };
    }));
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          onCompletedChange={handleCompletedChange}
          key={todo.id}
          {...todo}
        />
      ))}

      {/* <li> */}
      {/*  <div className="view"> */}
      {/*    <input type="checkbox" className="toggle" /> */}
      {/*    <label>asdfghj</label> */}
      {/*    <button type="button" className="destroy" /> */}
      {/*  </div> */}
      {/*  <input type="text" className="edit" /> */}
      {/* </li> */}

      {/* <li className="completed"> */}
      {/*  <div className="view"> */}
      {/*    <input type="checkbox" className="toggle" /> */}
      {/*    <label>qwertyuio</label> */}
      {/*    <button type="button" className="destroy" /> */}
      {/*  </div> */}
      {/*  <input type="text" className="edit" /> */}
      {/* </li> */}

      {/* <li className="editing"> */}
      {/*  <div className="view"> */}
      {/*    <input type="checkbox" className="toggle" /> */}
      {/*    <label>zxcvbnm</label> */}
      {/*    <button type="button" className="destroy" /> */}
      {/*  </div> */}
      {/*  <input type="text" className="edit" /> */}
      {/* </li> */}

      {/* <li> */}
      {/*  <div className="view"> */}
      {/*    <input type="checkbox" className="toggle" /> */}
      {/*    <label>1234567890</label> */}
      {/*    <button type="button" className="destroy" /> */}
      {/*  </div> */}
      {/*  <input type="text" className="edit" /> */}
      {/* </li> */}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
};
