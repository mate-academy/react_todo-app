import React, { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoElement } from '../TodoElement';

interface Props {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleToggle: (id: number, completed: boolean) => void;
  handleRename: (id: number, title: string) => void;
  handleBlur: () => void;
  setCurrTodoTitle: (currTodoTitle: string) => void;
  handleCancelEditing: (e: React.KeyboardEvent) => void;
  currTodoId: number;
  currTodoTitle: string;
}

export const TodosList: FC<Props> = ({
  todos,
  handleDelete,
  handleToggle,
  handleRename,
  handleBlur,
  currTodoId,
  currTodoTitle,
  setCurrTodoTitle,
  handleCancelEditing,
}) => (
  <ul className="todo-list" data-cy="todoList">
    {todos.map((todo) => (
      <TodoElement
        key={todo.id}
        todo={todo}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleRename={handleRename}
        handleBlur={handleBlur}
        handleCancelEditing={handleCancelEditing}
        currTodoId={currTodoId}
        currTodoTitle={currTodoTitle}
        setCurrTodoTitle={setCurrTodoTitle}
      />
    ))}
  </ul>
);
