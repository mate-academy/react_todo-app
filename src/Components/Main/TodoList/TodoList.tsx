import React, { useContext } from 'react';
import { TodosContext } from '../../../Context/TodosContext';
import { Status } from '../../../Types/Status';
import Todos from '../../../Types/Todos';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const {
    todos,
    status,
    // filterTodos,
    // handleActiveFilter,
    // handleCompletedFilter,
    // handleNoFilter,
    handleLeftCount,
  } = useContext(TodosContext);

  let filterTodos = todos;

  const activeFilter = filterTodos.filter((todo: Todos) => !todo.completed);
  const completedFilter = filterTodos.filter((todo: Todos) => todo.completed);

  switch (status) {
    case Status.all:
      // handleNoFilter();
      filterTodos = todos;
      handleLeftCount(activeFilter.length);
      break;

    case Status.active:
      // handleActiveFilter();
      filterTodos = activeFilter;
      handleLeftCount(activeFilter.length);
      break;

    case Status.completed:
      // handleCompletedFilter();
      filterTodos = completedFilter;
      handleLeftCount(activeFilter.length);
      break;

    default:
      break;
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {filterTodos.map((todo) => (
        <TodoItem
          key={`${todo.id}`}
          todo={todo}
        />
      ))}
    </ul>
  );
};
