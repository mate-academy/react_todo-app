import React from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { filtredTodos } = useContext(TodosContext);

  return (
    <>
      {filtredTodos().length === 0 && (
        <ul className="todo-list" data-cy="todoList">
          {filtredTodos().map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      )}
    </>
  );
};
