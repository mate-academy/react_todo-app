import React, { useContext } from 'react';
import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodosList: React.FC = () => {
  const { visibleTodos } = useContext(TodosContext);

  const filteredTodos: Todo[] = visibleTodos();

  console.log(filteredTodos);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
