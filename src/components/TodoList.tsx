import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/TodosContext';
import { getFilteredTasks } from '../service/getFilteredTasks';

type Props = {
};

export const TodoList: React.FC<Props> = () => {
  const { todos, filter } = useContext(TodosContext);

  const filterCompletedTasks = getFilteredTasks(todos, filter);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filterCompletedTasks.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
