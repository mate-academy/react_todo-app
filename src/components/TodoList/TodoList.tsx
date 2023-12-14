import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <>
      {filteredTodos && (
        <ul className="todo-list" data-cy="todosList">
          {filteredTodos().map(item => (
            <TodoItem
              item={item}
              key={item.id}
            />
          ))}
        </ul>
      )}
    </>
  );
};
