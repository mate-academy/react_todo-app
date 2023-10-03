import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../../TodosContext';

type Props = {
  filteredBy: string;
};

export const TodoList: React.FC<Props> = React.memo((({
  filteredBy,
}) => {
  const { todos } = useContext(TodosContext);

  const filteredTodos = todos.filter((todo) => {
    if (filteredBy === 'Active') {
      return !todo.completed;
    }

    if (filteredBy === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
}));
