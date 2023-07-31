import React, { useContext } from 'react';

import { Todo } from '../../Types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodosList: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
