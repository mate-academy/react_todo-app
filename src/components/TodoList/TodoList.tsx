import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos && filteredTodos.map((todo: Todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
