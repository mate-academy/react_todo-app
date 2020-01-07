import React from 'react';
import PropTypes from 'prop-types';

const MainTodoList = ({checkAll, filteredTodos, check, destroy}) => (
  <section className="main" style={{ display: 'block' }}>
    <input 
      onChange={checkAll}
      id="toggle-all" 
      className="toggle-all" 
      type="checkbox" 
    />
  <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      { filteredTodos.map( todo =>  (
        <li className={todo.completed ? "completed" : ""} key={todo.id} >
          <div className="view">
            <input 
              id={todo.id}
              className="toggle" 
              type="checkbox" 
              checked={todo.completed}
              onChange={e => check(e, todo.id)}
            />
            <label htmlFor={todo.id}>{todo.text}</label>
            <button className="destroy" onClick={() => destroy(todo.id)}></button>
          </div>
        </li>
      ))
      }
    </ul> 
  </section>
)

MainTodoList.propTypes = { 
  checkAll: PropTypes.func.isRequired,
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  check: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired
};

export default MainTodoList;
