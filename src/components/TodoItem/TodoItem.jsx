import React, {useState} from 'react'
import classNames from 'classnames'

export const TodoItem = ({todo, completed, id, getCheckedTodoId}) => {
  const [status, setStatus] = useState(false);
  const checkHandler = (e) => {
    setStatus(!status);
  }
  return(
    <li
      className={classNames('', {completed: status === true})}
    >
      <div className="view">
        <input 
          onChange={checkHandler}
          type="checkbox" 
          className="toggle"
          onClick={()=>{getCheckedTodoId(id)}}
        />
        <label>{todo}</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  )
}
