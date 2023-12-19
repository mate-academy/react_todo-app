import React from 'react';
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

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todoItem) => (
        <Todo
          key={todoItem.id}
          todoItem={todoItem}
          onItemDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
