import React, { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { Todo } from './Todo';

export const Todos = () => {
  const {
    state: { todos },
    dispatch,
  } = React.useContext(TodosContext);
  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_TODO_ITEM', id });
  };

  const [edit, setEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const handleLabel = () => {
    setEdit(!edit);
    setEditedTitle('');
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todoItem) => (
        <Todo
          key={todoItem.id}
          editTodo={edit}
          editedTitleTodo={editedTitle}
          todoItem={todoItem}
          onItemDelete={handleDelete}
          onLabelClick={handleLabel}
        />
      ))}
    </ul>
  );
};
