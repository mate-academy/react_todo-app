import React from 'react';
import {TodoItem} from '../TodoItem'

export const TodoList = ({items}) => {
  return(
    <ul>{items.map(item => (
      <li key={item.id}>
        <TodoItem 
          todo={item.todo}
          completed={item.completed}
          id={item.id}/>
      </li>
    ))}
    </ul>
  )
}
