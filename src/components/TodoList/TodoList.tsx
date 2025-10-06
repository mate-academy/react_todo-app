import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { useTodosContext } from '../../contexts/TodosContext';

type Props = {
  filter: Filter;
};

export const TodoList: React.FC<Props> = ({ filter }) => {
  const { todos } = useTodosContext();

  const filteredTodos = todos.filter((todo: Todo) => {
    if (todo.isLoading) {
      return true;
    }

    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  // eslint-disable-next-line max-len
  return filteredTodos.map((todo: Todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ));
};
