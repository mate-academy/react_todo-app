import React from 'react'

const Todo = ({ todo, toggle, destroy }) => {
  const { id, title, isDone } = todo;
  return (
    <li className="todo">
      <div className="view">
        <input type="checkbox" className="toggle" id={id} onClick ={() => toggle(id)} checked = {isDone}/>
        <label htmlFor={id} className ={isDone && "completed-item"}>{title}</label>
        <button type="button" className="destroy" onClick ={() => destroy(id)} />
      </div>
    </li>
  )
}

export default Todo
