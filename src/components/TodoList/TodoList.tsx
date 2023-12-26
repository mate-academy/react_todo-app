import { useContext } from 'react';

import { TodoItem } from '../TodoItem';

import { Context } from '../../services/context/ContextProvider';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const { todos } = useContext(Context);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo: Todo) => {
        return (
          <TodoItem todo={todo} key={todo.id} />
        );
      })}
    </ul>
  );
};
