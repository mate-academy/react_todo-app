import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoItem = ({
  todo,
  deleteTodo,
  changeCompleteness,
  // setChoosenTodoId,
}) => (
  <li className={cn({ completed: todo.completed })}>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        checked={todo.completed}
        onChange={() => {
          changeCompleteness(todo.id);
          // setChoosenTodoId(todo.id);
        }}
      />

      <label>{todo.title}</label>

      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(todo.id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>

  // <li>
  //   <div className="view">
  //     <input type="checkbox" className="toggle" />
  //     <label>asdfghj</label>
  //     <button type="button" className="destroy" />
  //   </div>
  //   <input type="text" className="edit" />
  // </li>

  // <li className="completed">
  //   <div className="view">
  //     <input type="checkbox" className="toggle" />
  //     <label>qwertyuio</label>
  //     <button type="button" className="destroy" />
  //   </div>
  //   <input type="text" className="edit" />
  // </li>

  // <li className="editing">
  //   <div className="view">
  //     <input type="checkbox" className="toggle" />
  //     <label>zxcvbnm</label>
  //     <button type="button" className="destroy" />
  //   </div>
  //   <input type="text" className="edit" />
  // </li>

  // <li>
  //   <div className="view">
  //     <input type="checkbox" className="toggle" />
  //     <label>1234567890</label>
  //     <button type="button" className="destroy" />
  //   </div>
  //   <input type="text" className="edit" />
  // </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeCompleteness: PropTypes.func.isRequired,
};
