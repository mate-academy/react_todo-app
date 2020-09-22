import React, { useState, useEffect } from 'react';
import { Todo } from "../Todo/Todo";

export const TodoList = ({itemsList}) => {

  if (itemsList.length <= 0) {
    return null;
  }

  return (
    <ul className="todo-list">
      {itemsList.map(item => <Todo todoItem={item} /> )}
    </ul>
  );
};
