import React from 'react';
import {TodoItem} from '../TodoItem'

export const TodoList = ({items, getCheckedTodoId}) => {
  return(
    <>
    <ul className="todo-list">
        <li>
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>asdfghj</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="completed">
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>qwertyuio</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>zxcvbnm</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li>
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>1234567890</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>
      </ul>

    <ul className="todo-list">{items.map(item => (
        <TodoItem 
          key={item.id}
          todo={item.todo}
          completed={item.completed}
          id={item.id}
          getCheckedTodoId={getCheckedTodoId}/>
    ))}
    </ul>
    </>
  )
}
