import React, { useContext, useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { fiteredTodos } from '../../helper/helper';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(TodosContext);

  const list = useMemo(() => {
    return fiteredTodos(todos, filter);
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {list.map(todo => (
        <TodoItem key={todo.id} todo={todo} list={list} />
      ))}
    </section>
  );
};
