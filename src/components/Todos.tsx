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

  const activeFilter = todos
    .filter((todoItem) => todoItem.completed === false);
  const complietedFilter = todos
    .filter((todoItem) => todoItem.completed === true);

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
        activeFilter
          .map((todoItem) => (
            <Todo
              key={todoItem.id}
              todoItem={todoItem}
              onItemDelete={handleDelete}
            />
          ))
      )}
      {filter === 'completed' && (
        complietedFilter
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
