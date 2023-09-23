import React from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = React.useContext(TodosContext);

  return (
    <>
      {filteredTodos().length === 0 && (
        <ul className="todo-list" data-cy="todoList">
          {filteredTodos().map(item => (
            <TodoItem
              key={item.id}
              item={item}            />
          ))}
        </ul>
      )}
    </>
  );
};
