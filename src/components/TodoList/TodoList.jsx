import React, { useState, useEffect } from 'react';
import { Todo } from "../Todo/Todo";

export const TodoList = ({itemsList}) => {
  const [deleteId, setDeleteId] = useState(0);

  if (itemsList.length <= 0) {
    return null;
  }

  const deleteTodo = (key) => {
    setDeleteId(key);
    const deletedItemIndex = itemsList.findIndex(item => item.id === key);
    itemsList.splice(deletedItemIndex, 1);
  }

  return (
    <ul className="todo-list">
      {itemsList.map(item =>
        <Todo
          key={item.id}
          todoItem={item}
          deleteTodo={deleteTodo}
          itemsList={itemsList}
        />
      )}
    </ul>
  );
};
