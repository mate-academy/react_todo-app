import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../TodosContext';
import { Todo } from '../todos';

export const TodoList: React.FC = () => {
  const { newTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {newTodos.map((todo: Todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        );
      })}
    </ul>
  );
};
