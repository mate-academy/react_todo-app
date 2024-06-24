import React, { useContext } from 'react';
import { TodosContext } from '../utils/TodosContext';
import { visiableTodos } from '../utils/getVisiableTodos';
import { TodoItem } from './TodoItem';
import { Status } from '../types/Status';

type Props = {
  queryStatus: Status;
};

export const TodoList: React.FC<Props> = ({ queryStatus }) => {
  const { todos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visiableTodos(todos, queryStatus).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
