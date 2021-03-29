import React from 'react'

export function Form({ handleQuery, query, handleChangeTodos, todos }) {
  return (
    <form onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        if (query.trim() !== '') {
          const newTodo = {
            id: +new Date(),
            title: query,
            completed: false,
          }

          handleQuery('')
          handleChangeTodos([...todos, newTodo])
        }
      }
    }}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={query}
        onChange={(event) => handleQuery(event.target.value)}
      />
    </form>
  )
}
