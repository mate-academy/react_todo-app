import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo, toggle, destroy }) => {
  const { id, title, isDone } = todo;

  return (
    <li className="todo">
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id}
          onClick={() => toggle(id)}
          checked={isDone}
        />
        <label
          htmlFor={id}
          className={isDone && 'completed-item'}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => destroy(id)}
        />
      </div>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    idDone: PropTypes.bool.isRequired,
  }).isRequired,
  toggle: PropTypes.func,
  destroy: PropTypes.func,
};

Todo.defaultProps = {
  toggle: null,
  destroy: null,
};

export default Todo;

/*

Not yet implemented

const myStorage = window.localStorage;

window.onbeforeunload = closingCode;
function closingCode() {
  // do something...
  return null;
}

 */

/*   componentDidMount() {
   const myLocaleStorage = myStorage.getItem('todoes');

   if (myLocaleStorage === 'undefined') {
     this.setState({
       todoes: JSON.parse(myLocaleStorage),
     })
   }
 }

 componentWillUnmount() {
   myStorage.setItem('todoes', JSON.stringify(this.state.todoes));
 } */
