import React from 'react';

import './TodoList.scss';
import { Todo } from '../Todo';

export const TodoList = ({ items, setTodos }) => {

  const handleStatus = (id) => {

    setTodos(prevTodos => prevTodos
      .map(item => {
        if (id !== item.id) {
          return {...item}
        } else {
          return {
            ...item,
            completed: !item.completed,
          }
        }
      }))
    }

  return (
    <ul className="todo-list">
      {items.map(item => (
          <Todo
            item={item}
            key={item.id}
            handleStatus={handleStatus}
          />
      ))}
    </ul>
  )
}