import React, { useContext } from 'react';
import { TodosContext } from '../../../Context/TodosContext';
import { Status } from '../../../Types/Status';
import { Todos } from '../../../Types/Todos';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const {
    todos,
    status,
  } = useContext(TodosContext);

  let filterTodos = todos;

  const activeFilter = filterTodos.filter((todo: Todos) => !todo.completed);
  const completedFilter = filterTodos.filter((todo: Todos) => todo.completed);

  switch (status) {
    case Status.All:
      filterTodos = todos;
      break;

    case Status.Active:
      filterTodos = activeFilter;
      break;

    case Status.Completed:
      filterTodos = completedFilter;
      break;

    default:
      break;
  }

  return (
    <ul className="todo-list" data-cy="todoList">
      {filterTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};
