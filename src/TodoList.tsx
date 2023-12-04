import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';
import { Todo } from './Types/Todo';

export const TodoList: React.FC = () => {
  const { filteredToDo } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredToDo().map((todo: Todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
