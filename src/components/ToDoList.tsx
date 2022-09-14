import React from 'react';
import { Todo } from '../types/ToDo';
import { TodoItem } from './ToDoItem';

type Props = {
  todos: Todo[],
  deleteHandler: (todoId: number) => void,
  completeHandler: (todoId: number) => void,
  updateHandler: (todoId: number, newTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteHandler,
  completeHandler,
  updateHandler,
}) => {
  return (
    <>
      <ul className="todo-list" data-cy="todosList">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            updateHandler={updateHandler}
          />
        ))}
      </ul>
    </>
  );
};
