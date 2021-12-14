import React from 'react'

export const TodoItem = ({todo, completed, id}) => {
  return(
    <>
      {`${todo} ${completed ? `completed` : `not completed`} ${id}`}
    </>
  )
}
