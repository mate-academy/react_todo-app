import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const { selectedFilter, showFilteredTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {showFilteredTodos(selectedFilter).map((item: Todo) => (
        <TodoItem key={item.id.toString()} todo={item} />
      ))}
    </ul>
  );
};
