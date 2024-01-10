/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from '../todoItem';
import { TodoContext } from '../todoContext';

type Props = {
};

export const TodoList: React.FC<Props> = () => {
  const { filteredTodo } = useContext(TodoContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodo.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
