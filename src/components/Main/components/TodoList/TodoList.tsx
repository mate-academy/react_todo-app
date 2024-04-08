import { Todo } from '../../../../types/Todo';
import { filterTodos } from '../../../../utils/utils';
import { TodosContext } from '../../../../store/Store';
import { TodoItem } from '../TodoItem/TodoItem';
import React, { useContext } from 'react';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { filter } = useContext(TodosContext);
  const displayedTodos: Todo[] = filterTodos(filter, items);

  return (
    <ul className="todo-list" data-cy="todosList">
      {displayedTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </ul>
  );
};
