import { useContext } from 'react';

import { TodoItem } from '../TodoItem';
import { TodosContext } from '../TodosContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { visibleTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {visibleTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
