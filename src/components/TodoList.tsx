import React, { useContext } from 'react';

import { TodoItem } from './TodoItem';
import { TodosContext } from '../Contexts/TodosContext';

type Props = {};

export const TodoList: React.FC<Props> = ({}) => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
