import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export function TodoItem({
  id,
  title,
  completed,
  todos,
  handleChangeTodos,
}) {
  const [clickCounter, clickHandler] = useState(0);
  const [currentTitle, handleChangeTitle] = useState(title)

  const deleteTodo = () => {
    handleChangeTodos(todos.filter(todo => {
      if (todo.id !== id) {
        return todo;
      }

      return false
    }))
  }

  const editTodo = (value) => {
    handleChangeTodos(todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        title: value
      }
    }))
  }

  const addTodo = () => {
    handleChangeTodos(todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        completed: !completed
      }
    }))
  }

  return (
    <li className={classNames({
      completed,
      editing: clickCounter === 2
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          onChange={addTodo}
          
        />
        <label onClick={() => {
            clickHandler(currentNo => currentNo + 1);
          }}
        >
          {currentTitle}
        </label>
        <button
          onClick={deleteTodo}
          type="button"
          className="destroy"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={currentTitle}
        onChange={(e) => {
          handleChangeTitle(e.target.value)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && currentTitle !== '') {
            clickHandler(0)
            editTodo(currentTitle)
          }

          if (e.key === 'Escape') {
            clickHandler(0)
            handleChangeTitle(title)
          }
        }}
      />
    </li>
  )
}
