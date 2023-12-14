import React, { useContext, useState } from 'react';
import { TodosContext } from '../../../Context/TodosContext';
import { Status } from '../../../Types/Status';
import Todos from '../../../Types/Todos';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const {
    todos,
    status,
  } = useContext(TodosContext);

  const [filterTodos, setFilterTodos] = useState(todos);

  // const handleFilterActive = () => {
  //   const activeFilter = filterTodos.filter((todo: Todos) => !todo.completed);

  //   setFilterTodos(activeFilter);
  // };

  // const handleFilterCompleted = () => {
  //   const completedFilter = filterTodos.filter((todo: Todos) => todo.completed);

  //   setFilterTodos(completedFilter);
  // };

  const activeFilter = filterTodos.filter((todo: Todos) => !todo.completed);
  const completedFilter = filterTodos.filter((todo: Todos) => todo.completed);

  switch (status) {
    case Status.all:
      setFilterTodos(todos);
      break;

    case Status.active:
      setFilterTodos(activeFilter);
      break;

    case Status.completed:
      setFilterTodos(completedFilter);
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
