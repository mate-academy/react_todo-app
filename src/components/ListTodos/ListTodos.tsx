import React, { useContext } from 'react';
import { Todo } from '../Todo/Todo';
import { Todo as TodoType } from '../../type';
import { StateContext } from '../../Store';

export const ListTodos: React.FC = () => {
  const { todos } = useContext(StateContext);
  const { filterStatus } = useContext(StateContext);

  if (!todos) {
    return;
  }

  const filteredTodos = todos.filter((todo: TodoType) => {
    switch (filterStatus) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todos;
    }
  });

  return (
    todos &&
    filteredTodos.map((todo: TodoType) => <Todo key={todo.id} todo={todo} />)
  );
};
