import React from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { Todo } from './Todo';

export const Todos = () => {
  const {
    state: { todos, filter },
    dispatch,
  } = React.useContext(TodosContext);
  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_TODO_ITEM', id });
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filter === 'all' && (
        todos
          .map((todoItem) => (
            <Todo
              key={todoItem.id}
              todoItem={todoItem}
              onItemDelete={handleDelete}
            />
          ))
      )}
      {filter === 'active' && (
        todos
          .filter((todoItem) => todoItem.completed === false)
          .map((todoItem) => (
            <Todo
              key={todoItem.id}
              todoItem={todoItem}
              onItemDelete={handleDelete}
            />
          ))
      )}
      {filter === 'completed' && (
        todos
          .filter((todoItem) => todoItem.completed === true)
          .map((todoItem) => (
            <Todo
              key={todoItem.id}
              todoItem={todoItem}
              onItemDelete={handleDelete}
            />
          ))
      )}

    </ul>
  );
};
