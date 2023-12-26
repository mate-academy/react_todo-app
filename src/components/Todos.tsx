import React from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { Todo } from './Todo';

export const Todos: React.FC = () => {
  enum FilterType {
    active = 'active',
    completed = 'completed',
    all = 'all',
  }

  const {
    state: { todos, filter },
    dispatch,
  } = React.useContext(TodosContext);
  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_TODO_ITEM', id });
  };

  let filteredTodos;

  switch (filter) {
    case FilterType.active:
      filteredTodos = todos.filter((todoItem) => todoItem.completed === false);
      break;
    case FilterType.completed:
      filteredTodos = todos.filter((todoItem) => todoItem.completed === true);
      break;
    default: filteredTodos = todos;
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos?.map((todoItem) => (
        <Todo
          key={todoItem.id}
          todoItem={todoItem}
          onItemDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
