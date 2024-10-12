import { FC, useContext, useMemo } from 'react';

import { StateContext } from '../../store/store';

import { getFilteredTodos } from '../../utils/getFilteredTodos';

import { TodoItem } from '../TodoItem';

export const TodoList: FC = () => {
  const { todos, filter } = useContext(StateContext);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
